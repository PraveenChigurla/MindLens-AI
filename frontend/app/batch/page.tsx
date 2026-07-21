"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { UploadCloud, FileText, CheckCircle, Play, Download, AlertCircle, Loader2 } from "lucide-react"
import Papa from "papaparse"
import * as XLSX from "xlsx"

export default function BatchPrediction() {
  const [file, setFile] = useState<File | null>(null)
  const [data, setData] = useState<any[]>([])
  const [results, setResults] = useState<any[]>([])
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0]
    if (!uploadedFile) return
    
    setFile(uploadedFile)
    setError("")
    setResults([])
    setProgress(0)
    
    if (uploadedFile.name.endsWith('.csv')) {
      Papa.parse(uploadedFile, {
        header: true,
        complete: (results) => {
          const validData = results.data.filter((row: any) => row.statement || row.text)
          setData(validData.slice(0, 100)) // Limit to 100 for safety on frontend
          if (validData.length === 0) setError("No 'statement' or 'text' column found in CSV.")
        }
      })
    } else if (uploadedFile.name.endsWith('.xlsx') || uploadedFile.name.endsWith('.xls')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const fileData = e.target?.result
        const workbook = XLSX.read(fileData, { type: 'binary' })
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]
        const json = XLSX.utils.sheet_to_json(sheet)
        const validData = json.filter((row: any) => row.statement || row.text)
        setData(validData.slice(0, 100))
        if (validData.length === 0) setError("No 'statement' or 'text' column found in Excel.")
      }
      reader.readAsBinaryString(uploadedFile)
    } else {
      setError("Please upload a CSV or Excel file.")
    }
  }

  const runBatchPrediction = async () => {
    if (data.length === 0) return
    
    setProcessing(true)
    setResults([])
    
    const newResults: any[] = []
    
    for (let i = 0; i < data.length; i++) {
      const text = data[i].statement || data[i].text
      if (!text) continue
      
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
        const res = await fetch(`${API_URL}/predict`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text })
        })
        
        if (res.ok) {
          const resultData = await res.json()
          newResults.push({
            original: text,
            prediction: resultData.prediction,
            confidence: resultData.confidence
          })
        } else {
          newResults.push({ original: text, prediction: "Error", confidence: 0 })
        }
      } catch (err) {
         newResults.push({ original: text, prediction: "Error", confidence: 0 })
      }
      
      setResults([...newResults])
      setProgress(Math.round(((i + 1) / data.length) * 100))
    }
    
    setProcessing(false)
  }

  const exportResults = () => {
    const csv = Papa.unparse(results)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", "batch_predictions.csv")
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-foreground text-glow mb-2">Batch Prediction</h1>
        <p className="text-muted-foreground">Upload a CSV or Excel file to process multiple statements at once.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="glass border-primary/20">
          <CardHeader>
            <CardTitle>Upload Data</CardTitle>
            <CardDescription>File must contain a column named "statement" or "text". Max 100 rows for browser processing.</CardDescription>
          </CardHeader>
          <CardContent>
            {!file ? (
              <div 
                className="border-2 border-dashed border-border/60 rounded-xl p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/10 hover:border-primary/50 transition-all group"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="bg-primary/10 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud className="size-10 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-1">Click to upload file</h3>
                <p className="text-sm text-muted-foreground mb-4">CSV or Excel (max 5MB)</p>
                <Button variant="outline" className="pointer-events-none">Select File</Button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept=".csv,.xlsx,.xls" 
                  className="hidden" 
                />
              </div>
            ) : (
              <div className="bg-card/40 border border-border/50 rounded-xl p-6 shadow-inner">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/20 rounded-lg text-primary glow-border">
                      <FileText className="size-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{file.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB • {data.length} valid rows found
                      </p>
                    </div>
                  </div>
                  {!processing && progress !== 100 && (
                    <Button variant="ghost" size="sm" onClick={() => {setFile(null); setData([]); setResults([]); setProgress(0)}} className="text-muted-foreground hover:text-destructive">
                      Remove
                    </Button>
                  )}
                </div>

                {error ? (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-lg flex items-center gap-2">
                    <AlertCircle className="size-4" /> {error}
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Processing Progress</span>
                        <span className="font-medium text-primary">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    <div className="flex gap-3">
                      {!processing && progress < 100 && (
                        <Button onClick={runBatchPrediction} className="flex-1 shadow-sm dark:shadow-[0_0_15px_rgba(139,92,246,0.3)] h-12">
                          <Play className="size-4 mr-2" /> Start Processing
                        </Button>
                      )}
                      {processing && (
                        <Button disabled className="flex-1 bg-primary/30 text-primary-foreground h-12 border border-primary/50 shadow-sm dark:shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                          <Loader2 className="size-4 mr-2 animate-spin" /> Processing... ({results.length}/{data.length})
                        </Button>
                      )}
                      {progress === 100 && (
                        <Button onClick={exportResults} className="flex-1 bg-green-500/20 border border-green-500/50 hover:bg-green-500/30 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)] h-12">
                          <Download className="size-4 mr-2" /> Export Results (CSV)
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {results.length > 0 && (
          <Card className="glass animate-in slide-in-from-bottom-4 duration-500">
            <CardHeader>
              <CardTitle>Results Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-border/50 overflow-hidden bg-card/50">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/30 text-muted-foreground text-xs uppercase font-semibold border-b border-border/50">
                    <tr>
                      <th className="px-4 py-3 w-12 text-center">#</th>
                      <th className="px-4 py-3">Statement</th>
                      <th className="px-4 py-3 w-40">Prediction</th>
                      <th className="px-4 py-3 w-32 text-right">Confidence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {results.slice(0, 10).map((res, i) => (
                      <tr key={i} className="hover:bg-muted/20 transition-colors">
                        <td className="px-4 py-3 text-center text-muted-foreground">{i + 1}</td>
                        <td className="px-4 py-3 truncate max-w-[300px]" title={res.original}>{res.original}</td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className={res.prediction === 'Error' ? 'border-destructive/30 text-destructive bg-destructive/10' : 'border-primary/30 text-primary bg-primary/10'}>
                            {res.prediction}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-right font-medium">
                          {(res.confidence * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {results.length > 10 && (
                <div className="text-center mt-4 text-sm text-muted-foreground bg-muted/20 p-2 rounded-md">
                  Showing first 10 rows. Export to see all {results.length} results.
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

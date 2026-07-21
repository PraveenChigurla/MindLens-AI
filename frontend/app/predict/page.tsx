"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BrainCircuit, Copy, Eraser, AlertCircle, Clock, Zap } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from "recharts"

export default function SinglePrediction() {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState("")

  const charCount = text.length
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0
  const readingTime = Math.ceil(wordCount / 200) || 1

  const handlePredict = async () => {
    if (!text.trim() || charCount > 5000) return

    setLoading(true)
    setError("")
    setResult(null)
    setLoadingStep(1) // Tokenizing

    try {
      setTimeout(() => setLoadingStep(2), 600) // Running Model
      setTimeout(() => setLoadingStep(3), 1200) // Generating Output
      
      const res = await fetch('/api/predict', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      })

      if (!res.ok) {
        throw new Error("Failed to process prediction. Please try again.")
      }

      const data = await res.json()
      setTimeout(() => {
        setResult(data)
        setLoading(false)
        setLoadingStep(0)
      }, 1800) // Finish artificial loading sequence for premium feel
      
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
      setLoadingStep(0)
    }
  }

  // Formatting probabilities for Recharts
  const chartData = result ? Object.keys(result.probabilities).map(key => ({
    name: key,
    value: result.probabilities[key] * 100
  })).sort((a, b) => b.value - a.value) : []

  const topPrediction = chartData[0]
  const alternatives = chartData.slice(1, 4)

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 0.8) return { label: "High Confidence", color: "bg-green-500/20 text-green-400 border-green-500/30" }
    if (confidence >= 0.5) return { label: "Moderate Confidence", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" }
    return { label: "Low Confidence", color: "bg-red-500/20 text-red-400 border-red-500/30" }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-foreground text-glow mb-2">Single Statement Prediction</h1>
        <p className="text-muted-foreground">Analyze individual texts for mental health indicators using DistilBERT.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Column */}
        <div className="space-y-4">
          <Card className="glass h-full flex flex-col">
            <CardHeader>
              <CardTitle>Input Text</CardTitle>
              <CardDescription>Enter the text you want the model to analyze.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="I feel hopeless and don't enjoy anything anymore..."
                className="flex-1 w-full p-4 rounded-lg bg-input/50 border border-border/50 text-foreground resize-none focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all min-h-[250px]"
              />
              <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                <div className="flex gap-4">
                  <span>{charCount} / 5000 chars</span>
                  <span>{wordCount} words</span>
                  <span>~{readingTime} min read</span>
                </div>
                <div>
                  <button onClick={() => setText("")} className="hover:text-destructive transition-colors flex items-center gap-1">
                    <Eraser className="size-3" /> Clear Text
                  </button>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-border/40">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2 font-medium">Load Sample for Class:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Normal", text: "I want to spend a lot of time shopping for snacks for Eid but I have 2 million left, make a self-registration" },
                    { label: "Depression", text: "I recently went through a breakup and she said she still wants to be friends. I just want to lose feelings so all this pain can stop it hurts so much and I cannot even cry about it. I wish we never met it would be much less painful." },
                    { label: "Anxiety", text: "sometimes what is needed when there is a problem is to laugh until you forget that there is a problem, when you remember it, you feel restless like that well, it turns out that I still have a sad burden" },
                    { label: "Stress", text: "I didn't do anything during spring break, except maybe go to work. And even then, I missed a day because I just couldn't deal with the stress. But now it seems like every time I have a break or a day off from work, it makes the stress worse." },
                    { label: "Suicidal", text: "I am so exhausted of this. Just when I think I can finally rest, another hurdle comes flying at me... it is like life is trying to get me to kill myself and honestly I think I would be better off dead." },
                    { label: "Bipolar", text: "Last week I felt invincible and didn't sleep for three days working on projects, but now I crashed and feel utterly worthless. I've been doing amazingly well on lamictal though." },
                    { label: "Personality disorder", text: "We created a Telegram group/room for people with AvPD (Avoidant Personality Disorder) who want to talk to other people with AvPD, to break the loneliness, pass the time, make friends or just lurk." }
                  ].map((sample) => (
                    <Badge 
                      key={sample.label} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-primary/20 hover:text-primary transition-colors border-border/50 bg-background/50"
                      onClick={() => setText(sample.text)}
                    >
                      {sample.label}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {error && (
                <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-lg flex items-center gap-2">
                  <AlertCircle className="size-4" />
                  {error}
                </div>
              )}

              <Button 
                onClick={handlePredict} 
                disabled={loading || !text.trim() || charCount > 5000}
                className="w-full mt-6 shadow-sm dark:shadow-[0_0_15px_rgba(139,92,246,0.3)] h-12"
              >
                {loading ? "Processing..." : <><BrainCircuit className="size-4 mr-2" /> Analyze Text</>}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Output Column */}
        <div className="space-y-4">
          {loading ? (
            <Card className="glass h-full flex items-center justify-center min-h-[400px]">
              <CardContent className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto">
                <div className="relative size-20">
                  <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
                  <div className="absolute inset-2 rounded-full border-r-2 border-secondary animate-spin-reverse"></div>
                  <BrainCircuit className="absolute inset-0 m-auto size-8 text-primary animate-pulse" />
                </div>
                <div className="space-y-2 w-full text-center">
                  <p className="text-sm font-medium text-foreground transition-all duration-300">
                    {loadingStep === 1 && "Tokenizing Input..."}
                    {loadingStep === 2 && "Running DistilBERT Layers..."}
                    {loadingStep === 3 && "Generating Confidence Scores..."}
                  </p>
                  <Progress value={loadingStep * 33.3} className="h-1.5" />
                </div>
              </CardContent>
            </Card>
          ) : result ? (
            <Card className="glass h-full border-primary/20 shadow-md dark:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all animate-in zoom-in-95 duration-500">
              <CardHeader className="border-b border-border/50 pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardDescription>Prediction Result</CardDescription>
                    <CardTitle className="text-3xl mt-1 text-glow text-foreground">{result.prediction}</CardTitle>
                    <Badge variant="outline" className={`mt-2 ${getConfidenceBadge(result.confidence).color}`}>
                      {getConfidenceBadge(result.confidence).label}
                    </Badge>
                  </div>
                  <div className="relative size-16 flex items-center justify-center rounded-full border-4 border-muted">
                    {/* SVG Circle Gauge representation */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle cx="28" cy="28" r="26" fill="none" strokeWidth="4" className="stroke-border" />
                      <circle cx="28" cy="28" r="26" fill="none" strokeWidth="4" className="stroke-primary shadow-sm dark:shadow-[0_0_10px_rgba(139,92,246,0.5)] transition-all duration-1000 ease-out" strokeDasharray={`${(result.confidence * 163.36).toFixed(2)} 163.36`} />
                    </svg>
                    <span className="font-bold text-sm">{(result.confidence * 100).toFixed(0)}%</span>
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1"><Clock className="size-3" /> Inference Time: {result.processing_time_ms?.toFixed(1) || 0} ms</div>
                  <div className="flex items-center gap-1"><Zap className="size-3" /> Model: DistilBERT</div>
                </div>
              </CardHeader>

              <CardContent className="pt-6 space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-3 text-muted-foreground">Probability Distribution</h4>
                  <div className="h-40 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                        <XAxis dataKey="name" tick={{fontSize: 10, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                        <YAxis tick={{fontSize: 10, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                        <RechartsTooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{backgroundColor: '#09090e', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px'}} itemStyle={{color: '#e2e8f0'}} />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? 'var(--color-primary)' : 'var(--color-accent)'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2 text-muted-foreground">Alternative Predictions</h4>
                  <div className="space-y-2">
                    {alternatives.map((alt, i) => (
                      <div key={i} className="flex items-center justify-between text-sm bg-muted/30 border border-border/30 p-2.5 rounded-md">
                        <span className="text-foreground">{alt.name}</span>
                        <span className="text-muted-foreground font-medium">{alt.value.toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="glass h-full flex items-center justify-center min-h-[400px] bg-card/20 border-dashed border-border/40">
              <CardContent className="flex flex-col items-center gap-3 text-muted-foreground text-center">
                <BrainCircuit className="size-12 mb-2 opacity-20" />
                <p className="font-medium">Waiting for input...</p>
                <p className="text-xs max-w-[200px]">Results and probability distributions will appear here.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      <div className="p-4 border border-border/50 rounded-xl bg-card/30 text-xs text-muted-foreground flex gap-3 shadow-inner">
        <AlertCircle className="size-5 shrink-0 text-primary/60" />
        <p><strong>Disclaimer:</strong> This tool is for educational and research purposes only. It is not intended to provide medical advice, diagnosis, or treatment. The DistilBERT model predictions are statistically derived text classifications and should not replace professional clinical judgement.</p>
      </div>
    </div>
  )
}

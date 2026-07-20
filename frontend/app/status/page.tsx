"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Server, Database, CheckCircle2, XCircle, Clock, RefreshCw } from "lucide-react"

export default function APIStatus() {
  const [health, setHealth] = useState<any>(null)
  const [version, setVersion] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const checkStatus = async () => {
    setLoading(true)
    try {
      const [healthRes, versionRes] = await Promise.all([
        fetch("http://localhost:8000/health").catch(() => null),
        fetch("http://localhost:8000/").catch(() => null)
      ])

      if (healthRes?.ok) {
        setHealth(await healthRes.json())
      } else {
        setHealth(null)
      }

      if (versionRes?.ok) {
        setVersion(await versionRes.json())
      } else {
        setVersion(null)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
      setLastUpdated(new Date())
    }
  }

  useEffect(() => {
    checkStatus()
    const interval = setInterval(checkStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  const isOnline = health?.status === "healthy"

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground text-glow mb-2">API Status</h1>
          <p className="text-muted-foreground">Real-time health monitoring of the FastAPI backend services.</p>
        </div>
        <button 
          onClick={checkStatus} 
          disabled={loading}
          className="flex items-center gap-2 text-sm bg-muted/20 hover:bg-muted/40 border border-border/50 px-4 py-2 rounded-lg transition-colors text-foreground"
        >
          <RefreshCw className={`size-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass relative overflow-hidden">
          <div className={`absolute top-0 left-0 w-full h-1 ${isOnline ? 'bg-green-500 shadow-[0_0_15px_#22c55e]' : 'bg-red-500 shadow-[0_0_15px_#ef4444]'}`}></div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="size-5" /> Overall System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mt-2 mb-2">
              {isOnline ? (
                <div className="bg-green-500/10 p-4 rounded-full border border-green-500/20">
                  <CheckCircle2 className="size-10 text-green-500" />
                </div>
              ) : (
                <div className="bg-red-500/10 p-4 rounded-full border border-red-500/20">
                  <XCircle className="size-10 text-red-500" />
                </div>
              )}
              <div>
                <p className={`text-2xl font-bold ${isOnline ? 'text-green-500 glow-text' : 'text-red-500'}`}>
                  {loading && !lastUpdated ? "Checking..." : isOnline ? "Operational" : "Service Disruption"}
                </p>
                {lastUpdated && (
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock className="size-3" /> Last checked: {lastUpdated.toLocaleTimeString()}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="size-5" /> API Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center border-b border-border/50 pb-2">
              <span className="text-muted-foreground">Version</span>
              <span className="font-medium text-foreground">{version?.version || "1.0.0"}</span>
            </div>
            <div className="flex justify-between items-center border-b border-border/50 pb-2">
              <span className="text-muted-foreground">Environment</span>
              <span className="font-medium text-foreground">Production</span>
            </div>
            <div className="flex justify-between items-center border-b border-border/50 pb-2">
              <span className="text-muted-foreground">Model</span>
              <span className="font-medium text-primary text-glow">{version?.model || "DistilBERT"}</span>
            </div>
            <div className="flex justify-between items-center pb-2">
              <span className="text-muted-foreground">Uptime</span>
              <span className="font-medium text-foreground">{health?.uptime_seconds ? `${(health.uptime_seconds / 3600).toFixed(1)} hours` : "N/A"}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="size-5" /> Endpoint Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/10 border border-border/30 rounded-lg hover:bg-muted/20 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`size-3 rounded-full ${isOnline ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-red-500'}`}></div>
                <div>
                  <p className="font-medium text-foreground">/predict</p>
                  <p className="text-xs text-muted-foreground">POST • Main inference endpoint</p>
                </div>
              </div>
              <Badge variant="outline" className={isOnline ? 'text-green-400 border-green-500/30 bg-green-500/5' : 'text-red-400 border-red-500/30 bg-red-500/5'}>
                {isOnline ? 'Operational' : 'Down'}
              </Badge>
            </div>
            
             <div className="flex items-center justify-between p-4 bg-muted/10 border border-border/30 rounded-lg hover:bg-muted/20 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`size-3 rounded-full ${isOnline ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-red-500'}`}></div>
                <div>
                  <p className="font-medium text-foreground">/health</p>
                  <p className="text-xs text-muted-foreground">GET • System diagnostics</p>
                </div>
              </div>
              <Badge variant="outline" className={isOnline ? 'text-green-400 border-green-500/30 bg-green-500/5' : 'text-red-400 border-red-500/30 bg-red-500/5'}>
                {isOnline ? 'Operational' : 'Down'}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/10 border border-border/30 rounded-lg hover:bg-muted/20 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`size-3 rounded-full ${isOnline ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-red-500'}`}></div>
                <div>
                  <p className="font-medium text-foreground">/metrics</p>
                  <p className="text-xs text-muted-foreground">GET • Evaluation metrics</p>
                </div>
              </div>
              <Badge variant="outline" className={isOnline ? 'text-green-400 border-green-500/30 bg-green-500/5' : 'text-red-400 border-red-500/30 bg-red-500/5'}>
                {isOnline ? 'Operational' : 'Down'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

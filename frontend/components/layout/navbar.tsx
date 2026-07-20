"use client"

import { useEffect, useState } from "react"
import { Activity, Clock } from "lucide-react"

export function Navbar() {
  const [status, setStatus] = useState("Checking...")
  const [latency, setLatency] = useState("--")

  useEffect(() => {
    async function checkHealth() {
      try {
        const start = performance.now()
        const res = await fetch("http://localhost:8000/health")
        const end = performance.now()
        if (res.ok) {
          setStatus("Online")
          setLatency(`${Math.round(end - start)}ms`)
        } else {
          setStatus("Degraded")
        }
      } catch {
        setStatus("Offline")
      }
    }
    checkHealth()
    const interval = setInterval(checkHealth, 30000)
    return () => clearInterval(interval)
  }, [])

  const isOnline = status === "Online"

  return (
    <header className="h-16 border-b border-border/50 glass sticky top-0 z-50 flex items-center justify-between px-6">
      <div className="flex items-center">
        <div className="md:hidden font-bold text-glow text-primary">MindLens AI</div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-black/20 px-3 py-1.5 rounded-full border border-border/50">
          <Activity className="size-4" />
          <span className="hidden sm:inline">Backend:</span>
          <div className="flex items-center gap-1.5 ml-1">
            <div className={`size-2 rounded-full ${isOnline ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-red-500 shadow-[0_0_8px_#ef4444]'}`} />
            <span className={isOnline ? 'text-green-400' : 'text-red-400 font-medium'}>{status}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-black/20 px-3 py-1.5 rounded-full border border-border/50">
          <Clock className="size-4" />
          <span className="hidden sm:inline">Latency:</span>
          <span className="text-foreground">{latency}</span>
        </div>
      </div>
    </header>
  )
}

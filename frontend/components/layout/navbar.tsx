"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity, Clock, Menu, X } from "lucide-react"
import { NAV_ITEMS } from "./sidebar"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [status, setStatus] = useState("Checking...")
  const [latency, setLatency] = useState("--")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    async function checkHealth() {
      try {
        const start = performance.now()
        // Fetch from proxy instead of hardcoded localhost so it works in production
        const res = await fetch("/health")
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
    <>
      <header className="h-16 border-b border-border/50 glass sticky top-0 z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-6" />
          </button>
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
          
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground bg-black/20 px-3 py-1.5 rounded-full border border-border/50">
            <Clock className="size-4" />
            <span className="hidden lg:inline">Latency:</span>
            <span className="text-foreground">{latency}</span>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden bg-background/80 backdrop-blur-sm animate-in fade-in">
          <div className="fixed inset-y-0 left-0 w-[80%] max-w-sm bg-background/95 border-r border-border/50 shadow-2xl flex flex-col animate-in slide-in-from-left glass">
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-lg text-primary glow-border">
                  <Activity className="size-6" />
                </div>
                <span className="text-xl font-bold text-glow tracking-wide text-foreground">
                  MindLens
                </span>
              </div>
              <button 
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="size-6" />
              </button>
            </div>
            
            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200",
                      isActive 
                        ? "bg-primary/15 text-primary shadow-[0_0_15px_rgba(139,92,246,0.15)] border border-primary/20" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className={cn("size-5", isActive ? "text-primary" : "text-muted-foreground")} />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

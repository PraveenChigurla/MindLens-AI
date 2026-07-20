import os

files = {
    'components/layout/sidebar.tsx': '''"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  Home, 
  MessageSquareText, 
  Layers, 
  BarChart2, 
  LineChart, 
  Settings, 
  Network, 
  Activity, 
  Info,
  FlaskConical
} from "lucide-react"

const NAV_ITEMS = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Single Prediction", href: "/predict", icon: MessageSquareText },
  { name: "Batch Prediction", href: "/batch", icon: Layers },
  { name: "Dataset & EDA", href: "/dataset", icon: BarChart2 },
  { name: "Model Performance", href: "/performance", icon: LineChart },
  { name: "Model Details", href: "/details", icon: Settings },
  { name: "Architecture", href: "/architecture", icon: Network },
  { name: "API Status", href: "/status", icon: Activity },
  { name: "Research Lab", href: "/research", icon: FlaskConical },
  { name: "About Project", href: "/about", icon: Info },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-border/50 glass hidden md:flex flex-col h-screen fixed left-0 top-0 z-40">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-primary/20 p-2 rounded-lg text-primary glow-border">
            <Activity className="size-6" />
          </div>
          <span className="text-xl font-bold text-glow tracking-wide text-foreground">
            MindLens AI
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-primary/15 text-primary shadow-[0_0_15px_rgba(139,92,246,0.15)] border border-primary/20" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className={cn("size-4", isActive ? "text-primary" : "text-muted-foreground")} />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border/50">
        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>© 2026 MindLens AI</p>
          <div className="flex justify-center gap-3 mt-2">
            <a href="#" className="hover:text-primary transition-colors">GitHub</a>
            <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </aside>
  )
}
''',

    'components/layout/navbar.tsx': '''"use client"

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
''',

    'app/layout.tsx': '''import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MindLens AI | Mental Health Text Classification",
  description: "AI-powered mental health text classification using DistilBERT.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="flex min-h-screen relative">
          <Sidebar />
          <div className="flex-1 md:ml-64 flex flex-col min-h-screen relative z-10">
            <Navbar />
            <main className="flex-1 p-6 lg:p-8 animate-in fade-in duration-500">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
'''
}

for path, content in files.items():
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

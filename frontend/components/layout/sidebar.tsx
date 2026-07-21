"use client"

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

export const NAV_ITEMS = [
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
                  ? "bg-primary/15 text-primary shadow-sm dark:shadow-[0_0_15px_rgba(139,92,246,0.15)] border border-primary/20" 
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
            <a href="https://github.com/PraveenChigurla/MindLens-AI" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/praveen-chigurla/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </aside>
  )
}

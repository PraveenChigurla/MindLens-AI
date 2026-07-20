import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Database, CheckCircle, BrainCircuit, Code, ExternalLink, Cpu } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl glass-panel p-8 md:p-12 mb-8 border border-border/50 shadow-2xl">
        <div className="relative z-10">
          <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/30 mb-4 px-3 py-1">
            MindLens Core v1.0
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-foreground text-glow leading-tight max-w-2xl">
            Mental Health Text Classification using DistilBERT
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mb-8">
            Advanced NLP pipeline fine-tuned for psychological text analysis. Supports 7 distinct mental health categories.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/predict" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all flex items-center gap-2">
              <BrainCircuit className="size-5" />
              Single Prediction
            </Link>
            <Link href="/dataset" className="bg-secondary/20 hover:bg-secondary/30 text-secondary-foreground border border-secondary/30 px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2">
              <Database className="size-5" />
              Explore Dataset
            </Link>
          </div>
        </div>
        
        {/* Animated background element simulation */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none hidden md:block">
           <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-[spin_60s_linear_infinite]">
            <path fill="#8b5cf6" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.6,-46.1C91.4,-33.1,98,-16.5,96.6,-0.8C95.2,14.9,85.8,29.9,74.9,41.9C64.1,54,51.8,63.1,38.3,71.3C24.8,79.5,10,86.8,-4.2,85.8C-18.4,84.8,-32.1,75.4,-44.6,65.8C-57.1,56.2,-68.4,46.3,-75.7,33.5C-83,20.7,-86.3,4.9,-85.1,-10.5C-83.9,-25.9,-78.2,-41,-68.8,-53.4C-59.4,-65.8,-46.3,-75.4,-32.4,-78.7C-18.5,-82,-3.8,-78.9,10.6,-76.2C25,-73.5,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100) scale(1.1)" />
          </svg>
        </div>
      </section>

      {/* Grid Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Dataset Stats */}
        <Card className="glass-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Database className="size-4 text-primary" /> Dataset
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground glow-text">51,093</div>
            <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
              <div><span className="text-primary font-semibold">40,875</span> Train</div>
              <div><span className="text-secondary font-semibold">10,218</span> Test</div>
            </div>
          </CardContent>
        </Card>

        {/* Model Stats */}
        <Card className="glass-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <BrainCircuit className="size-4 text-primary" /> Model Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground glow-text">82.8%</div>
            <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
              <div><span className="text-green-400 font-semibold">81.4%</span> External</div>
              <div><span className="text-blue-400 font-semibold">81.8%</span> F1 Score</div>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="glass-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Activity className="size-4 text-green-400" /> System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400" style={{textShadow: "0 0 10px rgba(74, 222, 128, 0.3)"}}>Online</div>
            <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
              <div><span className="text-foreground font-semibold">FastAPI</span> Backend</div>
              <div><span className="text-foreground font-semibold">CPU</span> Device</div>
            </div>
          </CardContent>
        </Card>

        {/* Tech Stack */}
        <Card className="glass-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Code className="size-4 text-primary" /> Tech Stack
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mt-1">
              <Badge variant="outline" className="border-border bg-background/50">Next.js</Badge>
              <Badge variant="outline" className="border-border bg-background/50">FastAPI</Badge>
              <Badge variant="outline" className="border-border bg-background/50">PyTorch</Badge>
              <Badge variant="outline" className="border-border bg-background/50">HF Transformers</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Preview */}
        <Card className="lg:col-span-2 glass-hover">
          <CardHeader>
            <CardTitle>Inference Pipeline Preview</CardTitle>
            <CardDescription>End-to-end data flow for a single prediction.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-center py-4">
              <div className="bg-background/50 border border-border/50 p-4 rounded-lg w-full md:w-32 glow-border transition-all">
                Raw Text
              </div>
              <div className="text-muted-foreground hidden md:block">→</div>
              <div className="bg-background/50 border border-border/50 p-4 rounded-lg w-full md:w-32 glow-border transition-all">
                Preprocessing
              </div>
              <div className="text-muted-foreground hidden md:block">→</div>
              <div className="bg-primary/20 border border-primary/30 p-4 rounded-lg w-full md:w-32 shadow-[0_0_15px_rgba(139,92,246,0.2)] text-primary font-bold">
                DistilBERT
              </div>
              <div className="text-muted-foreground hidden md:block">→</div>
              <div className="bg-background/50 border border-border/50 p-4 rounded-lg w-full md:w-32 glow-border transition-all">
                Probabilities
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Research Summary Snapshot */}
        <Card className="glass-hover">
          <CardHeader>
            <CardTitle>Research Snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Objective</p>
              <p className="text-sm leading-relaxed">Detect 7 mental health conditions from raw text patterns using transformer models.</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Classes</p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                <Badge variant="secondary" className="text-[10px] h-5 bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20">Depression</Badge>
                <Badge variant="secondary" className="text-[10px] h-5 bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20">Stress</Badge>
                <Badge variant="secondary" className="text-[10px] h-5 bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20">Anxiety</Badge>
                <span className="text-xs text-muted-foreground ml-1">+4 more</span>
              </div>
            </div>
            <Link href="/research" className="text-sm text-primary hover:text-primary/80 hover:underline flex items-center gap-1 pt-2 transition-colors">
              View full research <ExternalLink className="size-3" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

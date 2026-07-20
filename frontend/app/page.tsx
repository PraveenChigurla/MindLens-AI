"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, Database, CheckCircle, BrainCircuit, Code, ExternalLink, Cpu, Network, ArrowRight, ActivitySquare, Server, Layers, BarChart3, Binary, Brain } from "lucide-react"
import Link from "next/link"
import { PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer, Tooltip } from "recharts"

const miniDataset = [
  { name: 'Normal', value: 16039, color: '#3b82f6' },
  { name: 'Depression', value: 15392, color: '#ef4444' },
  { name: 'Suicidal', value: 10641, color: '#a855f7' },
]

const miniLatency = [
  { time: '10s', val: 18 }, { time: '9s', val: 21 }, { time: '8s', val: 19 },
  { time: '7s', val: 22 }, { time: '6s', val: 17 }, { time: '5s', val: 45 },
  { time: '4s', val: 23 }, { time: '3s', val: 18 }, { time: '2s', val: 20 },
  { time: '1s', val: 19 },
]

export default function Dashboard() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* 1. The Executive Hero */}
      <section className="relative overflow-hidden rounded-2xl glass-panel p-6 border border-border/50 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="relative z-10 space-y-4 w-full md:w-2/3">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground text-glow">Mental Health Text Classification</h1>
            <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10">v1.0.0</Badge>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Dataset</div>
              <div className="font-semibold text-foreground">51,093 <span className="text-xs text-muted-foreground font-normal">Samples</span></div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Classes</div>
              <div className="font-semibold text-foreground">7 <span className="text-xs text-muted-foreground font-normal">Categories</span></div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Model</div>
              <div className="font-semibold text-primary">DistilBERT</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">API Status</div>
              <div className="font-semibold text-green-400 flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Online
              </div>
            </div>
          </div>
        </div>

        {/* Animated Neural Network Hero Graphic */}
        <div className="hidden md:flex w-1/3 justify-end relative h-32 items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/5 blur-xl"></div>
          <svg viewBox="0 0 200 100" className="w-full h-full text-primary/40 drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]">
            <g className="animate-pulse" style={{ animationDuration: '3s' }}>
              <circle cx="20" cy="20" r="4" fill="currentColor" />
              <circle cx="20" cy="50" r="4" fill="currentColor" />
              <circle cx="20" cy="80" r="4" fill="currentColor" />
              
              <circle cx="100" cy="30" r="5" fill="currentColor" />
              <circle cx="100" cy="70" r="5" fill="currentColor" />
              
              <circle cx="180" cy="50" r="6" fill="#8b5cf6" className="animate-pulse" style={{ animationDuration: '1.5s' }} />

              <path d="M24 20 L96 30 M24 20 L96 70 M24 50 L96 30 M24 50 L96 70 M24 80 L96 30 M24 80 L96 70" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
              <path d="M104 30 L174 50 M104 70 L174 50" stroke="#8b5cf6" strokeWidth="2" />
            </g>
          </svg>
        </div>
      </section>

      {/* 2. Graphical Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/predict" className="group">
          <Card className="glass-hover h-full border-primary/20 hover:border-primary/50 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Brain className="size-24 text-primary" />
            </div>
            <CardHeader>
              <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                <BrainCircuit className="size-6 text-primary" />
              </div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors">Single Prediction</CardTitle>
              <CardDescription>Analyze one text statement interactively.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Open Tool <ArrowRight className="size-4" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/batch" className="group">
          <Card className="glass-hover h-full border-secondary/20 hover:border-secondary/50 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Layers className="size-24 text-secondary" />
            </div>
            <CardHeader>
              <div className="size-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-2">
                <Database className="size-6 text-secondary" />
              </div>
              <CardTitle className="text-xl group-hover:text-secondary transition-colors">Batch Prediction</CardTitle>
              <CardDescription>Upload CSV/Excel for bulk analysis.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium text-secondary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Upload File <ArrowRight className="size-4" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dataset" className="group">
          <Card className="glass-hover h-full border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <BarChart3 className="size-24 text-blue-500" />
            </div>
            <CardHeader>
              <div className="size-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-2">
                <BarChart3 className="size-6 text-blue-500" />
              </div>
              <CardTitle className="text-xl group-hover:text-blue-500 transition-colors">Dataset Explorer</CardTitle>
              <CardDescription>Interactive EDA and data distributions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium text-blue-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore Data <ArrowRight className="size-4" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* 3. Live Data Previews (Dense Dashboard Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Dataset Preview */}
        <Card className="glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Database className="size-4" /> Dataset Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[120px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={miniDataset} dataKey="value" innerRadius={25} outerRadius={45} paddingAngle={2}>
                    {miniDataset.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a' }} itemStyle={{ color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between text-xs mt-2">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Normal</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Depression</span>
            </div>
            <Link href="/dataset" className="text-xs text-muted-foreground hover:text-primary mt-3 block text-right">View details →</Link>
          </CardContent>
        </Card>

        {/* Performance Preview */}
        <Card className="glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <ActivitySquare className="size-4" /> Model Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Accuracy</span>
                <span className="font-bold text-green-400">82.8%</span>
              </div>
              <Progress value={82.8} className="h-2 bg-muted/50 [&>div]:bg-green-500" />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Macro F1</span>
                <span className="font-bold text-blue-400">81.8%</span>
              </div>
              <Progress value={81.8} className="h-2 bg-muted/50 [&>div]:bg-blue-500" />
            </div>
            <div className="pt-1">
              <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">Mini Confusion Matrix</div>
              <div className="grid grid-cols-3 gap-0.5 opacity-70">
                <div className="bg-primary/80 h-3 rounded-sm"></div>
                <div className="bg-primary/20 h-3 rounded-sm"></div>
                <div className="bg-primary/10 h-3 rounded-sm"></div>
                <div className="bg-primary/10 h-3 rounded-sm"></div>
                <div className="bg-primary/90 h-3 rounded-sm"></div>
                <div className="bg-primary/30 h-3 rounded-sm"></div>
                <div className="bg-primary/20 h-3 rounded-sm"></div>
                <div className="bg-primary/10 h-3 rounded-sm"></div>
                <div className="bg-primary/70 h-3 rounded-sm"></div>
              </div>
            </div>
            <Link href="/performance" className="text-xs text-muted-foreground hover:text-primary mt-1 block text-right">View metrics →</Link>
          </CardContent>
        </Card>

        {/* API Status */}
        <Card className="glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Server className="size-4" /> API Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end mb-4">
              <div>
                <div className="text-2xl font-bold text-foreground">18<span className="text-sm font-normal text-muted-foreground">ms</span></div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wide">P99 Latency</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-400">100%</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Uptime</div>
              </div>
            </div>
            <div className="h-[50px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={miniLatency}>
                  <Line type="monotone" dataKey="val" stroke="#8b5cf6" strokeWidth={2} dot={false} isAnimationActive={true} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <Link href="/status" className="text-xs text-muted-foreground hover:text-primary mt-3 block text-right">Live status →</Link>
          </CardContent>
        </Card>

        {/* Tech Stack */}
        <Card className="glass flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Code className="size-4" /> Tech Stack
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div className="bg-background/50 border border-border/50 rounded p-2 text-center text-xs font-medium">Next.js</div>
              <div className="bg-background/50 border border-border/50 rounded p-2 text-center text-xs font-medium">FastAPI</div>
              <div className="bg-background/50 border border-border/50 rounded p-2 text-center text-xs font-medium text-primary">DistilBERT</div>
              <div className="bg-background/50 border border-border/50 rounded p-2 text-center text-xs font-medium">PyTorch</div>
              <div className="bg-background/50 border border-border/50 rounded p-2 text-center text-xs font-medium col-span-2">Tailwind CSS</div>
            </div>
            <Link href="/architecture" className="text-xs text-muted-foreground hover:text-primary mt-3 block text-right">View architecture →</Link>
          </CardContent>
        </Card>

      </div>

      {/* 4. Interactive Architecture Animation */}
      <Card className="glass border-primary/20 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="size-5 text-primary" /> Live Inference Pipeline
          </CardTitle>
          <CardDescription>End-to-end data flow visualization during a prediction request.</CardDescription>
        </CardHeader>
        <CardContent className="pb-8">
          <div className="relative mt-8 max-w-4xl mx-auto">
            {/* The animated pulse line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0 hidden md:block">
              <div className="h-full bg-primary/50 w-full origin-left animate-[pulse-line_3s_ease-in-out_infinite]"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-0 relative z-10 text-center text-sm">
              <div className="bg-background border border-border rounded-lg p-3 md:mx-4 shadow-lg flex flex-col items-center gap-2 relative">
                <div className="size-8 rounded-full bg-muted/50 flex items-center justify-center"><Binary className="size-4 text-muted-foreground" /></div>
                Raw Text
                <div className="absolute -right-6 top-1/2 -translate-y-1/2 hidden md:block text-primary animate-[pulse-fade_3s_ease-in-out_infinite] delay-0">→</div>
              </div>
              
              <div className="bg-background border border-border rounded-lg p-3 md:mx-4 shadow-lg flex flex-col items-center gap-2 relative">
                <div className="size-8 rounded-full bg-blue-500/20 flex items-center justify-center"><Code className="size-4 text-blue-500" /></div>
                Clean & Pad
                <div className="absolute -right-6 top-1/2 -translate-y-1/2 hidden md:block text-primary animate-[pulse-fade_3s_ease-in-out_infinite] delay-500">→</div>
              </div>
              
              <div className="bg-background border border-border rounded-lg p-3 md:mx-4 shadow-lg flex flex-col items-center gap-2 relative">
                <div className="size-8 rounded-full bg-secondary/20 flex items-center justify-center"><Layers className="size-4 text-secondary" /></div>
                Tokenizer
                <div className="absolute -right-6 top-1/2 -translate-y-1/2 hidden md:block text-primary animate-[pulse-fade_3s_ease-in-out_infinite] delay-1000">→</div>
              </div>
              
              <div className="bg-primary/10 border border-primary/50 rounded-lg p-3 md:mx-4 shadow-[0_0_20px_rgba(139,92,246,0.15)] flex flex-col items-center gap-2 relative transform transition-transform hover:scale-105">
                <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center"><BrainCircuit className="size-4 text-primary" /></div>
                <span className="font-bold text-primary">DistilBERT</span>
                <div className="absolute -right-6 top-1/2 -translate-y-1/2 hidden md:block text-primary animate-[pulse-fade_3s_ease-in-out_infinite] delay-1500">→</div>
              </div>
              
              <div className="bg-background border border-border rounded-lg p-3 md:mx-4 shadow-lg flex flex-col items-center gap-2 relative col-span-2 md:col-span-1">
                <div className="size-8 rounded-full bg-green-500/20 flex items-center justify-center"><CheckCircle className="size-4 text-green-500" /></div>
                Prediction
              </div>
            </div>
            
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes pulse-line {
                0% { transform: scaleX(0); opacity: 0; }
                50% { opacity: 1; }
                100% { transform: scaleX(1); opacity: 0; }
              }
              @keyframes pulse-fade {
                0%, 100% { opacity: 0.2; transform: scale(1) translateY(-50%); }
                50% { opacity: 1; transform: scale(1.5) translateY(-30%); text-shadow: 0 0 10px rgba(139,92,246,0.8); }
              }
              .delay-0 { animation-delay: 0s; }
              .delay-500 { animation-delay: 0.6s; }
              .delay-1000 { animation-delay: 1.2s; }
              .delay-1500 { animation-delay: 1.8s; }
            `}} />
          </div>
        </CardContent>
      </Card>

      {/* 5. Research Highlights */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Research & Engineering Highlights</CardTitle>
          <CardDescription>A summary of the technical journey from notebook to production.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="size-4 text-green-400 mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">Aggregated <strong className="text-foreground">51,093</strong> text samples</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="size-4 text-green-400 mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">Mapped to <strong className="text-foreground">7</strong> distinct mental states</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="size-4 text-green-400 mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">Compared <strong className="text-foreground">7</strong> standard ML algorithms</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="size-4 text-green-400 mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">Built <strong className="text-foreground">2</strong> sequential neural networks</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="size-4 text-green-400 mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">Fine-tuned <strong className="text-foreground">DistilBERT</strong> base model</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="size-4 text-green-400 mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">Achieved <strong className="text-foreground">82.8%</strong> testing accuracy</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="size-4 text-green-400 mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">Deployed <strong className="text-foreground">FastAPI</strong> inference backend</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="size-4 text-green-400 mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">Built interactive <strong className="text-foreground">Next.js</strong> dashboard</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
    </div>
  )
}

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BrainCircuit, Cpu, Layers, GitMerge, FileCode2, Clock, Zap, Settings } from "lucide-react"

export default function ModelDetails() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-foreground text-glow mb-2">Model Details</h1>
        <p className="text-muted-foreground">Technical specifications and fine-tuning configurations of the DistilBERT model.</p>
      </div>

      {/* Hero Specs Card */}
      <Card className="glass overflow-hidden border-primary/20 relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
        <CardContent className="p-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="space-y-4 flex-1">
              <Badge className="bg-primary/20 text-primary border-primary/30 px-3 py-1">DistilBERT</Badge>
              <h2 className="text-4xl font-bold text-foreground tracking-tight">distilbert-base-uncased</h2>
              <p className="text-muted-foreground leading-relaxed">
                A smaller, faster, cheaper, and lighter version of BERT. DistilBERT retains 97% of BERT's language understanding capabilities while being 40% smaller and 60% faster.
              </p>
              <div className="flex gap-4 pt-4 text-sm text-foreground">
                <div className="flex items-center gap-2">
                  <Cpu className="size-4 text-primary" />
                  <span>66M Parameters</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="size-4 text-secondary" />
                  <span>6 Transformer Layers</span>
                </div>
              </div>
            </div>
            
            <div className="hidden md:flex flex-col gap-4 relative">
              <div className="size-32 rounded-full border-4 border-primary/20 flex items-center justify-center relative glow-border bg-card/80 backdrop-blur-xl">
                <BrainCircuit className="size-12 text-primary absolute animate-pulse" />
                <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_10s_linear_infinite]">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(139, 92, 246, 0.5)" strokeWidth="2" strokeDasharray="10 10" />
                  <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" strokeDasharray="5 5" className="animate-[spin_15s_linear_infinite_reverse]" />
                </svg>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fine-tuning parameters */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="size-5 text-primary" /> Fine-tuning Hyperparameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Learning Rate</span>
              <span className="font-mono text-foreground font-medium">2e-5</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Batch Size</span>
              <span className="font-mono text-foreground font-medium">16</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Epochs</span>
              <span className="font-mono text-foreground font-medium">4</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Weight Decay</span>
              <span className="font-mono text-foreground font-medium">0.01</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Optimizer</span>
              <span className="font-mono text-foreground font-medium text-right">AdamW</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">Loss Function</span>
              <span className="font-mono text-foreground font-medium text-right">CrossEntropyLoss</span>
            </div>
          </CardContent>
        </Card>

        {/* Tokenization */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCode2 className="size-5 text-secondary" /> Tokenization Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Tokenizer</span>
              <span className="font-mono text-foreground font-medium text-right">DistilBertTokenizer<br/><span className="text-xs text-muted-foreground font-sans">(WordPiece)</span></span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Max Length</span>
              <span className="font-mono text-foreground font-medium">384 tokens</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Padding</span>
              <span className="font-mono text-foreground font-medium">max_length</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-muted-foreground">Truncation</span>
              <span className="font-mono text-foreground font-medium">True</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">Vocab Size</span>
              <span className="font-mono text-foreground font-medium">30,522</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitMerge className="size-5 text-green-400" /> Training Environment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-muted/10 p-5 rounded-xl border border-border/50 flex flex-col items-center justify-center text-center hover:bg-muted/20 transition-colors">
              <Cpu className="size-8 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">Hardware</p>
              <p className="font-medium text-foreground mt-1">NVIDIA T4 GPU<br/><span className="text-xs text-muted-foreground font-normal">(Google Colab)</span></p>
            </div>
            <div className="bg-muted/10 p-5 rounded-xl border border-border/50 flex flex-col items-center justify-center text-center hover:bg-muted/20 transition-colors">
              <Clock className="size-8 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">Training Time</p>
              <p className="font-medium text-foreground mt-1">~2.5 Hours<br/><span className="text-xs text-muted-foreground font-normal">(for 4 epochs)</span></p>
            </div>
            <div className="bg-muted/10 p-5 rounded-xl border border-border/50 flex flex-col items-center justify-center text-center hover:bg-muted/20 transition-colors">
              <Zap className="size-8 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">Framework</p>
              <p className="font-medium text-foreground mt-1">PyTorch 2.0+<br/><span className="text-xs text-muted-foreground font-normal">& HuggingFace</span></p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

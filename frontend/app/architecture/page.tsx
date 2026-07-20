import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Monitor, Server, Database, BrainCircuit, ArrowRight, ArrowDown } from "lucide-react"

export default function Architecture() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-foreground text-glow mb-2">Project Architecture</h1>
        <p className="text-muted-foreground">End-to-end system design and data flow of the MindLens AI platform.</p>
      </div>

      <div className="relative py-12">
        {/* Connection lines for desktop */}
        <div className="absolute top-1/2 left-[20%] right-[20%] h-1 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20 -translate-y-1/2 hidden lg:block rounded-full">
          <div className="absolute top-0 left-0 h-full w-1/3 bg-primary animate-[pulse_2s_ease-in-out_infinite]" style={{boxShadow: '0 0 10px #8b5cf6'}}></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
          
          {/* Frontend */}
          <div className="flex flex-col items-center">
            <div className="bg-card/80 backdrop-blur-xl border-2 border-border/50 rounded-2xl p-6 w-full max-w-sm shadow-xl relative group hover:border-primary/50 transition-colors">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-background border border-border/50 rounded-full p-3 shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:border-primary/50 group-hover:text-primary">
                <Monitor className="size-6" />
              </div>
              <h3 className="text-xl font-bold text-center mt-4 mb-2">Frontend Interface</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="bg-muted/20 p-2 rounded border border-border/30 text-center">Next.js 15 (App Router)</div>
                <div className="bg-muted/20 p-2 rounded border border-border/30 text-center">React 19 Server Components</div>
                <div className="bg-muted/20 p-2 rounded border border-border/30 text-center">TailwindCSS v4 & Custom UI</div>
                <div className="bg-muted/20 p-2 rounded border border-border/30 text-center">Recharts Data Visualization</div>
              </div>
            </div>
            <ArrowDown className="size-8 text-primary/50 mt-4 lg:hidden" />
          </div>

          {/* Backend API */}
          <div className="flex flex-col items-center">
            <div className="bg-card/80 backdrop-blur-xl border-2 border-border/50 rounded-2xl p-6 w-full max-w-sm shadow-xl relative group hover:border-green-500/50 transition-colors">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-background border border-border/50 rounded-full p-3 shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:border-green-500/50 group-hover:text-green-500">
                <Server className="size-6" />
              </div>
              <h3 className="text-xl font-bold text-center mt-4 mb-2">Backend REST API</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="bg-muted/20 p-2 rounded border border-border/30 text-center">FastAPI Framework</div>
                <div className="bg-muted/20 p-2 rounded border border-border/30 text-center">Uvicorn ASGI Server</div>
                <div className="bg-muted/20 p-2 rounded border border-border/30 text-center">Pydantic Validation</div>
                <div className="bg-muted/20 p-2 rounded border border-border/30 text-center">Health & Metrics Middleware</div>
              </div>
            </div>
            <ArrowDown className="size-8 text-primary/50 mt-4 lg:hidden" />
          </div>

          {/* Machine Learning */}
          <div className="flex flex-col items-center">
            <div className="bg-card/80 backdrop-blur-xl border-2 border-border/50 rounded-2xl p-6 w-full max-w-sm shadow-xl relative group hover:border-secondary/50 transition-colors">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-background border border-border/50 rounded-full p-3 shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:border-secondary/50 group-hover:text-secondary">
                <BrainCircuit className="size-6" />
              </div>
              <h3 className="text-xl font-bold text-center mt-4 mb-2">Machine Learning Engine</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="bg-muted/20 p-2 rounded border border-border/30 text-center">PyTorch Inference</div>
                <div className="bg-muted/20 p-2 rounded border border-border/30 text-center">HuggingFace Transformers</div>
                <div className="bg-muted/20 p-2 rounded border border-border/30 text-center">DistilBERT Tokenizer</div>
                <div className="bg-muted/20 p-2 rounded border border-border/30 text-center">Scikit-Learn LabelEncoder</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
        <Card className="glass">
          <CardHeader>
            <CardTitle>Data Pipeline Flow</CardTitle>
          </CardHeader>
          <CardContent>
             <ol className="relative border-s border-border/50 ml-3 space-y-6">                  
                <li className="ms-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-primary/20 rounded-full -start-3 ring-4 ring-background border border-primary">
                        1
                    </span>
                    <h3 className="font-semibold text-foreground">User Request</h3>
                    <p className="text-sm text-muted-foreground mt-1">Client sends a POST request with raw text to `/predict` endpoint via the Next.js UI.</p>
                </li>
                <li className="ms-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-secondary/20 rounded-full -start-3 ring-4 ring-background border border-secondary">
                        2
                    </span>
                    <h3 className="font-semibold text-foreground">API Validation</h3>
                    <p className="text-sm text-muted-foreground mt-1">FastAPI receives the request, Pydantic validates the schema and ensures string length bounds.</p>
                </li>
                <li className="ms-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-green-500/20 rounded-full -start-3 ring-4 ring-background border border-green-500">
                        3
                    </span>
                    <h3 className="font-semibold text-foreground">Preprocessing</h3>
                    <p className="text-sm text-muted-foreground mt-1">Regex patterns remove URLs, emojis, and extra whitespace, converting text to lowercase.</p>
                </li>
                <li className="ms-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-yellow-500/20 rounded-full -start-3 ring-4 ring-background border border-yellow-500">
                        4
                    </span>
                    <h3 className="font-semibold text-foreground">Tokenization & Inference</h3>
                    <p className="text-sm text-muted-foreground mt-1">DistilBertTokenizer converts text to input_ids. PyTorch passes tensors through the DistilBERT model to get logits.</p>
                </li>
                <li className="ms-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-primary/20 rounded-full -start-3 ring-4 ring-background border border-primary">
                        5
                    </span>
                    <h3 className="font-semibold text-foreground">Response Generation</h3>
                    <p className="text-sm text-muted-foreground mt-1">Softmax applies probabilities. LabelEncoder maps the highest prob to a string. JSON response is returned.</p>
                </li>
            </ol>
          </CardContent>
        </Card>

        <div className="space-y-6">
           <Card className="glass">
            <CardHeader>
              <CardTitle>Deployment Architecture</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>The application is designed for containerized deployment or PaaS hosting.</p>
              <div className="bg-muted/10 border border-border/30 p-4 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Recommended Setup</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Frontend:</strong> Vercel or Netlify (Serverless edge network)</li>
                  <li><strong>Backend:</strong> Render or Railway Web Service (Docker container)</li>
                  <li><strong>Model Storage:</strong> Embedded in Docker image or pulled from HuggingFace Hub on init.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code2, Terminal, User } from "lucide-react"
import Link from "next/link"

export default function About() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-foreground text-glow mb-2">About Project</h1>
        <p className="text-muted-foreground">The story behind MindLens AI and the developers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass md:col-span-2 border-primary/20">
          <CardHeader>
            <CardTitle>The Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground text-sm leading-relaxed">
            <p>
              Mental health issues are often masked behind digital footprints—social media posts, journal entries, and casual messages. Early detection can be a critical factor in providing timely support.
            </p>
            <p>
              <strong>MindLens AI</strong> was developed as an exploratory platform to demonstrate how modern Natural Language Processing (NLP), specifically Transformer architectures like DistilBERT, can parse complex human emotions and identify underlying psychological distress in unstructured text.
            </p>
            <p>
              This project bridges the gap between deep learning research and production-grade software engineering, featuring a complete end-to-end pipeline: from data preprocessing and model fine-tuning in PyTorch, to a highly concurrent FastAPI backend, and finally to this responsive Next.js dashboard.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="text-center border-b border-border/40 pb-2 mb-2">
            <h3 className="font-bold text-xl text-foreground tracking-wide">Developed By</h3>
          </div>

          <Card className="glass flex flex-col items-center justify-center text-center p-6 border-primary/20 hover:border-primary/50 transition-colors">
            <div className="size-20 rounded-full bg-primary/10 border-2 border-primary/50 flex items-center justify-center mb-4 overflow-hidden relative shadow-sm dark:shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary opacity-20"></div>
              <Code2 className="size-8 text-primary relative z-10" />
            </div>
            <h4 className="font-bold text-lg text-primary mb-4 text-glow">Praveen Chigurla</h4>
            
            <div className="flex gap-4 mt-auto">
              <Link href="https://github.com/PraveenChigurla" target="_blank" title="GitHub" className="p-2.5 bg-muted/20 hover:bg-muted/40 hover:text-primary rounded-full transition-colors border border-border/50">
                <Terminal className="size-5" />
              </Link>
              <Link href="https://www.linkedin.com/in/praveen-chigurla/" target="_blank" title="LinkedIn" className="p-2.5 bg-muted/20 hover:bg-muted/40 hover:text-secondary rounded-full transition-colors border border-border/50">
                <User className="size-5" />
              </Link>
            </div>
          </Card>

          <Card className="glass flex flex-col items-center justify-center text-center p-6 border-primary/20 hover:border-primary/50 transition-colors">
            <div className="size-20 rounded-full bg-secondary/10 border-2 border-secondary/50 flex items-center justify-center mb-4 overflow-hidden relative shadow-[0_0_15px_rgba(236,72,153,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-bl from-primary to-secondary opacity-20"></div>
              <Code2 className="size-8 text-secondary relative z-10" />
            </div>
            <h4 className="font-bold text-lg text-secondary mb-4 text-glow">Khushi Kore</h4>
            
            <div className="flex gap-4 mt-auto">
              <Link href="https://github.com/khushikore" target="_blank" title="GitHub" className="p-2.5 bg-muted/20 hover:bg-muted/40 hover:text-secondary rounded-full transition-colors border border-border/50">
                <Terminal className="size-5" />
              </Link>
              <Link href="https://www.linkedin.com/in/khushi-kore/" target="_blank" title="LinkedIn" className="p-2.5 bg-muted/20 hover:bg-muted/40 hover:text-secondary rounded-full transition-colors border border-border/50">
                <User className="size-5" />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FlaskConical, Target, TrendingUp, AlertTriangle } from "lucide-react"

export default function ResearchLab() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-foreground text-glow mb-2">Research Lab</h1>
        <p className="text-muted-foreground">The journey from baseline ML models to a fine-tuned Transformer.</p>
      </div>

      <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/30 before:to-transparent pt-8 pb-8">
        
        {/* Phase 1 */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm dark:shadow-[0_0_10px_rgba(139,92,246,0.3)] z-10 text-primary">
            <Target className="size-5" />
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-xl border border-border/50 glass hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-primary text-lg">Phase 1: Baseline Models</span>
              <span className="text-xs text-muted-foreground px-2 py-1 bg-muted/20 rounded">Scikit-Learn</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Started with traditional ML techniques (TF-IDF + Logistic Regression, Random Forest, SVM).</p>
            <div className="bg-muted/20 p-3 rounded-lg text-sm border border-border/30">
              <span className="text-foreground font-medium">Result:</span> ~65-70% Accuracy. Struggled heavily with contextual meaning and sarcasm.
            </div>
          </div>
        </div>

        {/* Phase 2 */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(59,130,246,0.3)] z-10 text-secondary">
            <TrendingUp className="size-5" />
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-xl border border-border/50 glass hover:border-secondary/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-secondary text-lg">Phase 2: Deep Learning (LSTM)</span>
              <span className="text-xs text-muted-foreground px-2 py-1 bg-muted/20 rounded">TensorFlow</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Implemented sequence models using custom embeddings and Bi-LSTMs to capture word order.</p>
            <div className="bg-muted/20 p-3 rounded-lg text-sm border border-border/30">
              <span className="text-foreground font-medium">Result:</span> ~75% Accuracy. Better context, but suffered from vanishing gradients on long posts.
            </div>
          </div>
        </div>

        {/* Phase 3 */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(34,197,94,0.3)] z-10 text-green-400">
            <FlaskConical className="size-5" />
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-xl border border-green-500/30 glass hover:border-green-500/50 transition-colors shadow-[0_0_20px_rgba(34,197,94,0.05)]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-green-400 text-lg text-glow">Phase 3: Transformer Era</span>
              <span className="text-xs text-muted-foreground px-2 py-1 bg-muted/20 rounded">PyTorch + HF</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Adopted DistilBERT for its balance of performance and speed. Fine-tuned all 66M parameters on our 51K dataset for 4 epochs.</p>
            <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg text-sm text-green-100/90 shadow-inner">
              <span className="font-bold text-green-400">Final Result:</span> 82.8% Accuracy, 81.8% Macro F1. Superior understanding of nuance and implicit distress signals.
            </div>
          </div>
        </div>
      </div>

      <Card className="glass mt-12 border-destructive/20 hover:border-destructive/40 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="size-5" /> Error Analysis & Limitations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>Despite the high accuracy, the model exhibits certain failure modes that require further research:</p>
          <ul className="list-disc pl-5 space-y-3">
            <li><strong>Comorbidity Overlap:</strong> The model struggles to differentiate between "Depression" and "Anxiety" when users express symptoms of both simultaneously (a common real-world occurrence).</li>
            <li><strong>Sarcasm and Humor:</strong> Gen-Z coping mechanisms often involve dark humor. The model occasionally misclassifies self-deprecating jokes as genuine suicidal ideation.</li>
            <li><strong>Short Contexts:</strong> Predictions on texts under 10 words drop significantly in confidence due to lack of syntactic context and nuance.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

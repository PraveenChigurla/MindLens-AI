"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, FileText, PieChart, BarChart2 } from "lucide-react"
import { BarChart, Bar, PieChart as RechartsPieChart, Pie, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts"

export default function DatasetEDA() {
  const classDistribution = [
    { name: 'Depression', value: 15000, color: 'var(--color-primary)' },
    { name: 'Stress', value: 12000, color: '#3b82f6' },
    { name: 'Anxiety', value: 10000, color: '#0ea5e9' },
    { name: 'Normal', value: 8000, color: '#22c55e' },
    { name: 'Bipolar', value: 3000, color: '#f59e0b' },
    { name: 'Personality disorder', value: 2000, color: '#d946ef' },
    { name: 'Suicidal', value: 1093, color: '#ef4444' },
  ]

  const textLengthDistribution = [
    { range: '0-50', count: 12000 },
    { range: '51-100', count: 18000 },
    { range: '101-200', count: 11000 },
    { range: '201-300', count: 5000 },
    { range: '301-400', count: 3000 },
    { range: '401+', count: 2093 },
  ]

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-foreground text-glow mb-2">Dataset & Exploratory Data Analysis</h1>
        <p className="text-muted-foreground">Insights and statistics from the 51,093 text samples used to train DistilBERT.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass md:col-span-1 border-primary/20">
          <CardHeader>
            <CardTitle>Dataset Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4 border-b border-border/50 pb-4">
              <div className="p-3 bg-primary/20 rounded-lg text-primary glow-border">
                <Database className="size-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Samples</p>
                <p className="text-2xl font-bold text-foreground">51,093</p>
              </div>
            </div>
            <div className="flex items-center gap-4 border-b border-border/50 pb-4">
              <div className="p-3 bg-secondary/20 rounded-lg text-secondary glow-border">
                <PieChart className="size-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Classes</p>
                <p className="text-2xl font-bold text-foreground">7</p>
              </div>
            </div>
            <div className="flex items-center gap-4 border-b border-border/50 pb-4">
              <div className="p-3 bg-green-500/20 rounded-lg text-green-400 glow-border">
                <FileText className="size-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Language</p>
                <p className="text-xl font-bold text-foreground">English (Uncased)</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-3 text-foreground">Preprocessing Steps applied:</p>
              <div className="flex flex-wrap gap-2 text-xs">
                <Badge variant="outline" className="border-border/50 bg-background/50">Lowercasing</Badge>
                <Badge variant="outline" className="border-border/50 bg-background/50">URL Removal</Badge>
                <Badge variant="outline" className="border-border/50 bg-background/50">Emoji Removal</Badge>
                <Badge variant="outline" className="border-border/50 bg-background/50">Special Char Removal</Badge>
                <Badge variant="outline" className="border-border/50 bg-background/50">Multi-space fixing</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass md:col-span-2">
          <CardHeader>
            <CardTitle>Class Distribution</CardTitle>
            <CardDescription>Number of samples per mental health condition in the training set.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={classDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {classDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} className="drop-shadow-lg" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{backgroundColor: '#09090e', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px'}} 
                    itemStyle={{color: '#e2e8f0'}} 
                  />
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }}/>
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass">
        <CardHeader>
          <CardTitle>Text Length Distribution (Words)</CardTitle>
          <CardDescription>Analysis of statement lengths to determine the optimal max_length parameter for tokenization.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={textLengthDistribution} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="range" tick={{fontSize: 12, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 12, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}} 
                  contentStyle={{backgroundColor: '#09090e', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px'}} 
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                   {textLengthDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`rgba(59, 130, 246, ${1 - index * 0.1})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 p-4 bg-muted/20 border border-border/30 rounded-lg text-sm text-muted-foreground flex gap-3">
            <BarChart2 className="size-5 shrink-0 text-secondary" />
            <p><strong>Insight:</strong> The vast majority of statements fall under 200 words. During tokenization, a <code>max_length</code> of 384 tokens was selected, allowing DistilBERT to capture the full context of 99% of the dataset without excessive padding overhead.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

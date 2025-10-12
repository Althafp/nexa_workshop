"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCw, Play } from "lucide-react"
import { cn } from "@/lib/utils"

// CodeMirror
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { oneDark } from "@codemirror/theme-one-dark"

const initialCode = `// NexScript Example
// Write your first Nexa contract here
// This is placeholder code for demo purposes.

function helloNexa(name) {
  return "Hello, " + name + "!";
}

// In a real environment, you'd compile & deploy this contract.
// Click "Run" to simulate output below.
console.log(helloNexa("World"));
`

export function TutorialEditor() {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState<string[]>([])

  const extensions = useMemo(() => [javascript({ jsx: true }), oneDark], [])

  const runCode = () => {
    // Simulate execution: we won't evaluate arbitrary code, just emit a friendly log.
    const lines = [
      "[nexc] Compiling contract...",
      "[nexc] Deploying to localnet...",
      "[nexc] Running...",
      "Hello, World!",
      "[nexc] Done ✅",
    ]
    setOutput(lines)
  }

  const reset = () => {
    setCode(initialCode)
    setOutput([])
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">Editor</h2>
        <div className="flex items-center gap-2">
          <Button onClick={runCode} className="rounded-xl ring-1 ring-neon hover:ring-2 transition">
            <Play className="mr-2 h-4 w-4" />
            Run
          </Button>
          <Button variant="secondary" onClick={reset} className="rounded-xl">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden rounded-2xl border-border/80 bg-card/70">
        <CardHeader className="py-3">
          <CardTitle className="text-sm text-muted-foreground">NexScript (demo)</CardTitle>
        </CardHeader>
        <CardContent className={cn("p-0")}>
          <CodeMirror
            value={code}
            height="320px"
            theme={oneDark}
            extensions={extensions}
            onChange={setCode}
            basicSetup={{
              lineNumbers: true,
              highlightActiveLineGutter: true,
            }}
          />
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/80 bg-card/70">
        <CardHeader className="py-3">
          <CardTitle className="text-sm text-muted-foreground">Output Console</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              "font-mono text-sm",
              "rounded-xl border border-border bg-secondary/60 p-3",
              output.length === 0 && "text-muted-foreground",
            )}
            role="log"
            aria-live="polite"
          >
            {output.length === 0 ? (
              <p>Click Run to simulate console output...</p>
            ) : (
              <ul className="space-y-1">
                {output.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

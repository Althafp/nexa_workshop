"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
}

export function CodeBlock({ code, language = "bash", filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      {filename && (
        <div className="bg-muted border border-b-0 rounded-t-lg px-4 py-2 text-xs text-muted-foreground font-mono">
          {filename}
        </div>
      )}
      <div className={`relative bg-slate-950 text-slate-50 p-4 overflow-x-auto ${filename ? 'rounded-b-lg' : 'rounded-lg'}`}>
        <Button
          size="sm"
          variant="ghost"
          onClick={copyToClipboard}
          className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 hover:bg-slate-700"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
        <pre className="text-sm">
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
    </div>
  )
}


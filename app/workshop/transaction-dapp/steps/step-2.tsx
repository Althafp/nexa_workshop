"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Terminal, CheckCircle2 } from "lucide-react"
import { CodeBlock } from "@/components/code-block"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Step2Setup() {
  return (
    <div className="space-y-8">
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>What You'll Do</AlertTitle>
        <AlertDescription>
          Set up a new Next.js project with TypeScript and start the development server.
        </AlertDescription>
      </Alert>

      {/* Step 1: Create Project */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon text-background font-bold text-sm">
              1
            </div>
            Create Next.js Project
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Run this command in your terminal to create a new Next.js project:
          </p>
          
          <CodeBlock 
            code="npx create-next-app@latest nexa-transaction-dapp"
            language="bash"
          />

          <Alert className="bg-blue-500/10 border-blue-500/20">
            <AlertDescription className="text-sm">
              This will download and set up a new Next.js project in a folder called <code className="bg-muted px-1 rounded">nexa-transaction-dapp</code>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Step 2: Answer Prompts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon text-background font-bold text-sm">
              2
            </div>
            Answer Setup Questions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The setup wizard will ask you some questions. Use these answers:
          </p>
          
          <div className="rounded-lg border divide-y">
            <div className="flex items-center justify-between p-4">
              <span className="text-sm">Would you like to use TypeScript?</span>
              <Badge className="bg-green-600">Yes</Badge>
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="text-sm">Would you like to use ESLint?</span>
              <Badge className="bg-green-600">Yes</Badge>
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="text-sm">Would you like to use Tailwind CSS?</span>
              <Badge className="bg-green-600">Yes</Badge>
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="text-sm">Would you like to use <code className="bg-muted px-1 rounded">src/</code> directory?</span>
              <Badge variant="outline">No</Badge>
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="text-sm">Would you like to use App Router?</span>
              <Badge className="bg-green-600">Yes</Badge>
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="text-sm">Would you like to customize the default import alias?</span>
              <Badge variant="outline">No</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 3: Navigate to Project */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon text-background font-bold text-sm">
              3
            </div>
            Navigate to Project Directory
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Enter your new project folder:
          </p>
          
          <CodeBlock 
            code="cd nexa-transaction-dapp"
            language="bash"
          />
        </CardContent>
      </Card>

      {/* Step 4: Start Dev Server */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon text-background font-bold text-sm">
              4
            </div>
            Start Development Server
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Start the development server to see your app running:
          </p>
          
          <CodeBlock 
            code="npm run dev"
            language="bash"
          />

          <Alert className="bg-green-500/10 border-green-500/20">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-600">Success!</AlertTitle>
            <AlertDescription className="text-sm">
              Your server will start on <code className="bg-muted px-1 rounded">http://localhost:3000</code>
              <br />
              Open this URL in your browser to see your app.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Why Next.js */}
      <Card className="border-2 border-blue-500/20">
        <CardHeader>
          <CardTitle>Why Next.js?</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-neon mt-0.5 flex-shrink-0" />
              <div>
                <strong>Built-in TypeScript:</strong> Type safety for catching errors early
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-neon mt-0.5 flex-shrink-0" />
              <div>
                <strong>React 19:</strong> Latest React features out of the box
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-neon mt-0.5 flex-shrink-0" />
              <div>
                <strong>File-based Routing:</strong> Easy navigation structure
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-neon mt-0.5 flex-shrink-0" />
              <div>
                <strong>Production Ready:</strong> Optimized for performance
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

    </div>
  )
}


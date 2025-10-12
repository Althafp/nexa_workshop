"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Package, AlertCircle } from "lucide-react"
import { CodeBlock } from "@/components/code-block"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Step3Dependencies() {
  return (
    <div className="space-y-8">
      <Alert>
        <Package className="h-4 w-4" />
        <AlertTitle>What You'll Do</AlertTitle>
        <AlertDescription>
          Install the Nexa Wallet SDK and configure webpack for browser compatibility.
        </AlertDescription>
      </Alert>

      {/* Install Nexa SDK */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon text-background font-bold text-sm">
              1
            </div>
            Install Nexa Wallet SDK
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Install the official Nexa Wallet SDK package:
          </p>
          
          <CodeBlock 
            code="npm install @nexajs/wallet"
            language="bash"
          />

          <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-4">
            <h4 className="font-semibold text-sm text-blue-600 mb-2">What this includes:</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>✓ Full HD wallet support</li>
              <li>✓ Rostrum network integration</li>
              <li>✓ Transaction building & signing</li>
              <li>✓ Address validation</li>
              <li>✓ BIP39 for seed phrases (included)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Configure Webpack */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon text-background font-bold text-sm">
              2
            </div>
            Configure Webpack
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-yellow-500/10 border-yellow-500/20">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertTitle className="text-yellow-600">Important!</AlertTitle>
            <AlertDescription className="text-sm">
              The Nexa SDK uses Node.js modules that don't exist in browsers. We need to tell webpack to ignore them.
            </AlertDescription>
          </Alert>

          <p className="text-sm text-muted-foreground">
            Update your <code className="bg-muted px-1 rounded">next.config.mjs</code> file:
          </p>
          
          <CodeBlock 
            filename="next.config.mjs"
            code={`/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Disable Node.js modules in browser
    config.resolve.fallback = {
      ...config.resolve.fallback,
      tls: false,
      net: false,
      fs: false,
      dns: false,
    }
    return config
  },
}

export default nextConfig`}
            language="javascript"
          />

          <div className="rounded-lg bg-purple-500/10 border border-purple-500/20 p-4">
            <h4 className="font-semibold text-sm text-purple-600 mb-2">What this does:</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• <strong>tls/net:</strong> Network modules (not needed, Rostrum uses WebSockets)</li>
              <li>• <strong>fs:</strong> File system (not available in browser)</li>
              <li>• <strong>dns:</strong> DNS resolution (handled by browser)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Restart Server */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon text-background font-bold text-sm">
              3
            </div>
            Restart Development Server
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            After updating the config, restart your development server:
          </p>
          
          <div className="space-y-2">
            <p className="text-sm font-semibold">Stop the server:</p>
            <CodeBlock 
              code="Press Ctrl+C in the terminal"
              language="bash"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold">Start it again:</p>
            <CodeBlock 
              code="npm run dev"
              language="bash"
            />
          </div>

          <Alert className="bg-green-500/10 border-green-500/20">
            <AlertDescription className="text-sm">
              ✅ Your project is now ready for Nexa blockchain integration!
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

    </div>
  )
}


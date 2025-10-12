"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, ExternalLink } from "lucide-react"

export function IntegrationInfo() {
  return (
    <Card className="border-neon/30 bg-gradient-to-br from-neon/5 to-transparent">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-neon/20 p-2">
            <CheckCircle2 className="h-5 w-5 text-neon" />
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold">Official Nexa Wallet SDK</h3>
                <Badge variant="outline" className="text-xs">
                  Production-Ready
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                This playground uses the official <strong>nexa-wallet-sdk</strong> with Rostrum provider for complete blockchain functionality.
              </p>
            </div>

            <div className="grid gap-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-muted-foreground"><strong>HD wallet</strong> with 12-word seed phrases</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-muted-foreground"><strong>Real balance</strong> via Rostrum network</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-muted-foreground"><strong>Transaction building</strong> and broadcasting</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-muted-foreground"><strong>Full testnet integration</strong> ready</span>
              </div>
            </div>

            <Alert>
              <AlertDescription className="text-xs">
                <strong>Official SDK:</strong> Using{" "}
                <a
                  href="https://gitlab.com/nexa/wallet-sdk-ts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon hover:underline inline-flex items-center gap-1"
                >
                  nexa-wallet-sdk
                  <ExternalLink className="h-3 w-3" />
                </a>
                {" "}with Rostrum provider for complete wallet management, balance fetching, and transaction broadcasting.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


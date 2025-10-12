"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Rocket } from "lucide-react"

export function Step7Testing() {
  return (
    <div className="space-y-8">
      <Alert>
        <Rocket className="h-4 w-4" />
        <AlertTitle>Final Step!</AlertTitle>
        <AlertDescription>
          Test your DApp and verify it works with official Nexa wallets.
        </AlertDescription>
      </Alert>

      {/* Test 1: Generate Wallet */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon text-background font-bold text-sm">
              1
            </div>
            Generate Wallet Test
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-neon mt-1 flex-shrink-0" />
              <div>Select <Badge variant="outline">Testnet</Badge> network</div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-neon mt-1 flex-shrink-0" />
              <div>Click <strong>"Generate Wallet"</strong></div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-neon mt-1 flex-shrink-0" />
              <div>Verify 12-word seed phrase is displayed</div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-neon mt-1 flex-shrink-0" />
              <div>Copy and save the seed phrase</div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-neon mt-1 flex-shrink-0" />
              <div>Verify address starts with <code className="bg-muted px-1 rounded">nexa:nqtsq5g5</code></div>
            </li>
          </ol>
        </CardContent>
      </Card>

      {/* Test 2: Import Wallet */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon text-background font-bold text-sm">
              2
            </div>
            Import Wallet Test
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-neon mt-1 flex-shrink-0" />
              <div>Disconnect your current wallet</div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-neon mt-1 flex-shrink-0" />
              <div>Click <strong>"Import Wallet"</strong></div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-neon mt-1 flex-shrink-0" />
              <div>Paste the seed phrase you saved</div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-neon mt-1 flex-shrink-0" />
              <div>Verify same address is restored</div>
            </li>
          </ol>
        </CardContent>
      </Card>

      {/* Test 3: Cross-Wallet Compatibility */}
      <Card className="border-2 border-neon/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon text-background font-bold text-sm">
              3
            </div>
            Cross-Wallet Compatibility Test
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This is the <strong>most important test</strong> - verifying your DApp works with official wallets!
          </p>

          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <Badge className="mt-1 flex-shrink-0">Test A</Badge>
              <div>
                <strong>Import your seed phrase into Wally wallet</strong>
                <div className="text-muted-foreground mt-1">
                  Should show the same address and balance
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Badge className="mt-1 flex-shrink-0">Test B</Badge>
              <div>
                <strong>Import your seed phrase into Otoplo wallet</strong>
                <div className="text-muted-foreground mt-1">
                  Should show the same address and balance
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Badge className="mt-1 flex-shrink-0">Test C</Badge>
              <div>
                <strong>Create wallet in Wally, then import to your DApp</strong>
                <div className="text-muted-foreground mt-1">
                  Should restore the same address
                </div>
              </div>
            </div>
          </div>

          <Alert className="bg-green-500/10 border-green-500/20">
            <AlertDescription className="text-sm">
              ✅ If all tests pass, your DApp is 100% compatible with official Nexa wallets!
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Test 4: Get Testnet NEXA */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon text-background font-bold text-sm">
              4
            </div>
            Get Testnet NEXA
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            You need testnet NEXA to test transactions. Here's how to get some:
          </p>

          <div className="space-y-3">
            <div className="rounded-lg border p-4">
              <div className="font-semibold text-sm mb-2">Option 1: Discord Faucet</div>
              <div className="text-sm text-muted-foreground">
                Join Nexa Discord and ask in <code className="bg-muted px-1 rounded">#testnet-faucet</code> channel
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="font-semibold text-sm mb-2">Option 2: Use Another Wallet</div>
              <div className="text-sm text-muted-foreground">
                If you have testnet NEXA in Wally/Otoplo, send it to your new address
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="font-semibold text-sm mb-2">Option 3: Ask Community</div>
              <div className="text-sm text-muted-foreground">
                Ask other developers to send you some testnet NEXA
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test 5: Send Transaction */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon text-background font-bold text-sm">
              5
            </div>
            Send Transaction Test
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-neon mt-1 flex-shrink-0" />
              <div>Ensure you have at least 10 NEXA balance</div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-neon mt-1 flex-shrink-0" />
              <div>Enter a recipient address (another wallet you control)</div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-neon mt-1 flex-shrink-0" />
              <div>Enter amount (minimum 10 NEXA)</div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-neon mt-1 flex-shrink-0" />
              <div>Click <strong>"Send Transaction"</strong></div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-neon mt-1 flex-shrink-0" />
              <div>Wait for success confirmation</div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-neon mt-1 flex-shrink-0" />
              <div>Click explorer link to view on blockchain</div>
            </li>
          </ol>
        </CardContent>
      </Card>

      {/* Congratulations */}
      <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-2 border-green-500/30">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="text-6xl">🎉</div>
            <h3 className="text-2xl font-bold text-green-600">Congratulations!</h3>
            <p className="text-muted-foreground">
              You've built a production-ready Nexa transaction DApp from scratch!
            </p>
            <div className="text-sm space-y-1">
              <div>✅ HD wallet architecture (BIP39/BIP44)</div>
              <div>✅ Nexa SDK integration</div>
              <div>✅ Rostrum network communication</div>
              <div>✅ Transaction building & signing</div>
              <div>✅ Cross-wallet compatibility</div>
              <div>✅ Production best practices</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>What's Next?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <Badge variant="outline" className="mt-0.5">1</Badge>
            <div>
              <strong>Add more features:</strong> Transaction history, QR codes, address book
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Badge variant="outline" className="mt-0.5">2</Badge>
            <div>
              <strong>Deploy your DApp:</strong> Use Vercel, Netlify, or your own server
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Badge variant="outline" className="mt-0.5">3</Badge>
            <div>
              <strong>Learn smart contracts:</strong> Try the NexScript smart contract tutorial
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Badge variant="outline" className="mt-0.5">4</Badge>
            <div>
              <strong>Join the community:</strong> Share your project and get feedback
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


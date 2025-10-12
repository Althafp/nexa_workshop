"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, CheckCircle2, Code } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function Project2Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <Link href="/workshop" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
          <Button asChild>
            <Link href="/playground">Test in Playground</Link>
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Project Header */}
        <div className="mb-8">
          <Badge className="mb-4">Project 2</Badge>
          <h1 className="text-4xl font-bold tracking-tight">Pay-to-Public-Key (P2PKT)</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Build a simple payment contract where only the recipient can claim funds
          </p>
        </div>

        {/* Learning Objectives */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What You'll Learn</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[
                "Understanding P2PKT (Pay-to-Public-Key-Template)",
                "Hash functions and public key verification",
                "Creating basic payment contracts",
                "Testing with the NexScript SDK"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-neon mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Steps */}
        <div className="space-y-6">
          {/* Step 1 */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon text-background font-bold">
                  1
                </div>
                <CardTitle>Write the P2PKT Contract</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Create a file called <code className="bg-muted px-2 py-1 rounded">p2pkt.nex</code> with this simple contract:
              </p>
              <div className="relative">
                <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm">
{`pragma nexscript ^0.1.0;

contract P2PKT(bytes20 pkh) {
  function spend(pubkey pk, sig s) {
    // Verify the public key hash matches
    require(hash160(pk) == pkh);
    
    // Verify the signature
    require(checkSig(s, pk));
  }
}`}
                </pre>
              </div>
              <Alert>
                <AlertDescription>
                  <strong>Explanation:</strong> This contract uses a hash of the public key (pkh) for privacy. 
                  To spend funds, you must provide both the public key and a valid signature.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon text-background font-bold">
                  2
                </div>
                <CardTitle>Compile the Contract</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Compile your P2PKT contract:</p>
              <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto">
{`nexc ./p2pkt.nex --output ./p2pkt.json`}
              </pre>
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon text-background font-bold">
                  3
                </div>
                <CardTitle>Create the Integration Script</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Create a JavaScript file to interact with your P2PKT contract:</p>
              <Tabs defaultValue="deploy" className="w-full">
                <TabsList>
                  <TabsTrigger value="deploy">Deploy</TabsTrigger>
                  <TabsTrigger value="spend">Spend</TabsTrigger>
                </TabsList>
                <TabsContent value="deploy">
                  <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm">
{`import { Contract, ElectrumNetworkProvider } from '@nexscript/nexscript';
import artifact from './p2pkt.json';

// Setup
const provider = new ElectrumNetworkProvider('testnet');

// Generate or import your keys
// For this example, we'll use a placeholder
const alicePubKeyHash = 'your_20_byte_hash_here';

// Instantiate the contract
const contract = new Contract(
  artifact, 
  [alicePubKeyHash], 
  { provider }
);

console.log('Contract Address:', contract.address);
console.log('Send funds to this address to deploy the contract');`}
                  </pre>
                </TabsContent>
                <TabsContent value="spend">
                  <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm">
{`import { SignatureTemplate } from '@nexscript/nexscript';

// Get contract balance
const balance = await contract.getBalance();
console.log('Contract Balance:', balance);

// Spend from the contract
const spendTx = await contract.functions
  .spend(alicePublicKey, new SignatureTemplate(alicePrivateKey))
  .to('nexa:recipient_address', 5000n)
  .send();

console.log('Transaction sent!');
console.log('TXID:', spendTx.txid);`}
                  </pre>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Step 4 */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon text-background font-bold">
                  4
                </div>
                <CardTitle>Understanding the Flow</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="border-l-4 border-neon pl-4">
                  <h4 className="font-semibold mb-2">1. Create Contract</h4>
                  <p className="text-sm text-muted-foreground">
                    The contract is initialized with a hash of the recipient's public key (pkh)
                  </p>
                </div>
                <div className="border-l-4 border-neon/60 pl-4">
                  <h4 className="font-semibold mb-2">2. Fund Contract</h4>
                  <p className="text-sm text-muted-foreground">
                    Send NEXA to the contract address to lock funds
                  </p>
                </div>
                <div className="border-l-4 border-neon/40 pl-4">
                  <h4 className="font-semibold mb-2">3. Spend Funds</h4>
                  <p className="text-sm text-muted-foreground">
                    Only the owner of the private key can spend by providing their public key and signature
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 5 */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon text-background font-bold">
                  5
                </div>
                <CardTitle>Test in the Playground</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Ready to test your P2PKT contract? Head to the playground to:
              </p>
              <ul className="space-y-2 ml-6 list-disc text-muted-foreground">
                <li>Create a wallet and get your public key hash</li>
                <li>Deploy your P2PKT contract</li>
                <li>Fund it with test NEXA</li>
                <li>Spend from the contract</li>
              </ul>
              <Button asChild size="lg" className="w-full bg-neon hover:bg-neon/90">
                <Link href="/playground">
                  <Code className="mr-2 h-4 w-4" />
                  Open Testing Playground
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Button asChild variant="outline">
            <Link href="/workshop/project-1">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous Project
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/workshop">
              Back to Projects
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}



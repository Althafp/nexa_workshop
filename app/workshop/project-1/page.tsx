"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, CheckCircle2, Code } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function Project1Page() {
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
          <Badge className="mb-4">Project 1</Badge>
          <h1 className="text-4xl font-bold tracking-tight">Simple Token Transfer</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Create a smart contract that allows token transfer with a timeout mechanism
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
                "How to write a basic NexScript smart contract",
                "Working with public keys and signatures",
                "Implementing time-based constraints",
                "Compiling and deploying contracts",
                "Calling contract functions from JavaScript"
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
                <CardTitle>Write the Smart Contract</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Create a file called <code className="bg-muted px-2 py-1 rounded">transfer_with_timeout.nex</code> with the following contract:
              </p>
              <div className="relative">
                <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm">
{`pragma nexscript ^0.1.0;

contract TransferWithTimeout(
  pubkey sender, 
  pubkey recipient, 
  int timeout
) {
  // Allow the recipient to claim their received money
  function transfer(sig recipientSig) {
    require(checkSig(recipientSig, recipient));
  }

  // Allow sender to reclaim after timeout
  function timeout(sig senderSig) {
    require(checkSig(senderSig, sender));
    require(tx.time >= timeout);
  }
}`}
                </pre>
              </div>
              <Alert>
                <AlertDescription>
                  <strong>Explanation:</strong> This contract has two functions - one that allows the recipient to claim funds anytime, 
                  and another that allows the sender to reclaim funds after the timeout period expires.
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
                <CardTitle>Install NexScript Tools</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Install the NexScript compiler and SDK:</p>
              <Tabs defaultValue="npm" className="w-full">
                <TabsList>
                  <TabsTrigger value="npm">npm</TabsTrigger>
                  <TabsTrigger value="yarn">yarn</TabsTrigger>
                </TabsList>
                <TabsContent value="npm">
                  <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto">
{`# Install the compiler globally
npm install -g @nexscript/nexc

# Install the SDK in your project
npm install @nexscript/nexscript`}
                  </pre>
                </TabsContent>
                <TabsContent value="yarn">
                  <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto">
{`# Install the compiler globally
yarn global add @nexscript/nexc

# Install the SDK in your project
yarn add @nexscript/nexscript`}
                  </pre>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon text-background font-bold">
                  3
                </div>
                <CardTitle>Compile the Contract</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Compile your contract to create an artifact:</p>
              <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto">
{`nexc ./transfer_with_timeout.nex --output ./transfer_with_timeout.json`}
              </pre>
              <Alert>
                <AlertDescription>
                  This creates a JSON artifact file that contains all the information needed to interact with your contract.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Step 4 */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon text-background font-bold">
                  4
                </div>
                <CardTitle>Integrate with JavaScript</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Create a JavaScript file to interact with your contract:</p>
              <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm">
{`import { Contract, SignatureTemplate, ElectrumNetworkProvider } from '@nexscript/nexscript';
import artifact from './transfer_with_timeout.json';

// Setup network provider
const provider = new ElectrumNetworkProvider('testnet');

// Replace with actual public keys
const alicePub = 'your_sender_pubkey';
const bobPub = 'your_recipient_pubkey';
const timeout = 100000n; // Block height

// Instantiate contract
const contract = new Contract(
  artifact, 
  [alicePub, bobPub, timeout], 
  { provider }
);

console.log('Contract Address:', contract.address);
console.log('Contract Balance:', await contract.getBalance());

// Bob claims the transfer
const transferTx = await contract.functions
  .transfer(new SignatureTemplate(bobPrivateKey))
  .to('nexa:recipient_address', 10000n)
  .send();

console.log('Transfer successful:', transferTx.txid);`}
              </pre>
            </CardContent>
          </Card>

          {/* Step 5 */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon text-background font-bold">
                  5
                </div>
                <CardTitle>Test Your Contract</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Now you're ready to test! Click the button below to open the testing playground where you can:
              </p>
              <ul className="space-y-2 ml-6 list-disc text-muted-foreground">
                <li>Create or import a wallet</li>
                <li>Deploy your contract</li>
                <li>Call the transfer and timeout functions</li>
                <li>View transaction results</li>
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
            <Link href="/workshop">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
          <Button asChild>
            <Link href="/workshop/project-2">
              Next Project
              <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}



"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { steps } from "../steps-data"

export default function StepPage() {
  const params = useParams()
  const stepNumber = parseInt(params.step as string)
  const currentStep = steps.find(s => s.number === stepNumber)
  const prevStep = steps.find(s => s.number === stepNumber - 1)
  const nextStep = steps.find(s => s.number === stepNumber + 1)

  if (!currentStep) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Step Not Found</h1>
          <Button asChild>
            <Link href="/workshop/transaction-dapp">Back to Tutorial</Link>
          </Button>
        </Card>
      </div>
    )
  }

  const StepContent = currentStep.component

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <Link 
            href="/workshop/transaction-dapp" 
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tutorial Overview
          </Link>
          <Button asChild size="sm" variant="ghost">
            <Link href="/playground" className="flex items-center gap-2">
              Demo DApp
            </Link>
          </Button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Step {stepNumber} of {steps.length}</span>
            <span className="text-muted-foreground">{Math.round((stepNumber / steps.length) * 100)}% Complete</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-neon transition-all duration-300"
              style={{ width: `${(stepNumber / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">{currentStep.title}</h1>
          <p className="text-lg text-muted-foreground">{currentStep.description}</p>
        </div>

        <StepContent />

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
          {prevStep ? (
            <Button asChild variant="outline" size="lg">
              <Link href={`/workshop/transaction-dapp/${prevStep.number}`} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Previous: {prevStep.title}
              </Link>
            </Button>
          ) : (
            <div />
          )}

          {nextStep ? (
            <Button asChild size="lg" className="ml-auto">
              <Link href={`/workshop/transaction-dapp/${nextStep.number}`} className="flex items-center gap-2">
                Next: {nextStep.title}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button asChild size="lg" className="ml-auto bg-green-600 hover:bg-green-700">
              <Link href="/playground" className="flex items-center gap-2">
                🎉 Test Your DApp
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>

      </div>
    </div>
  )
}


import { Step1Understanding } from "./steps/step-1"
import { Step2Setup } from "./steps/step-2"
import { Step3Dependencies } from "./steps/step-3"
import { Step4WalletUtils } from "./steps/step-4"
import { Step5Components } from "./steps/step-5"
import { Step6Transactions } from "./steps/step-6"
import { Step7Testing } from "./steps/step-7"

export interface StepData {
  number: number
  title: string
  description: string
  component: React.ComponentType
}

export const steps: StepData[] = [
  {
    number: 1,
    title: "Understanding Nexa",
    description: "Learn blockchain fundamentals and Nexa basics before building",
    component: Step1Understanding,
  },
  {
    number: 2,
    title: "Project Setup",
    description: "Create your Next.js project with TypeScript",
    component: Step2Setup,
  },
  {
    number: 3,
    title: "Install Dependencies",
    description: "Add Nexa SDK and configure webpack",
    component: Step3Dependencies,
  },
  {
    number: 4,
    title: "Wallet Utilities",
    description: "Create core wallet functions for your DApp",
    component: Step4WalletUtils,
  },
  {
    number: 5,
    title: "UI Components",
    description: "Build wallet manager and interface components",
    component: Step5Components,
  },
  {
    number: 6,
    title: "Transactions",
    description: "Add transaction sending functionality",
    component: Step6Transactions,
  },
  {
    number: 7,
    title: "Test & Deploy",
    description: "Test your DApp and verify compatibility",
    component: Step7Testing,
  },
]


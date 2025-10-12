import { TutorialSidebar } from "@/components/tutorial/sidebar"
import { TutorialEditor } from "@/components/tutorial/editor"
import { ProgressSteps } from "@/components/progress"

export default function TutorialPage() {
  return (
    <main className="mx-auto grid min-h-dvh w-full max-w-7xl grid-cols-1 md:grid-cols-[260px_1fr]">
      <aside className="border-r border-border bg-secondary/40 p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-pretty text-xl font-semibold tracking-tight">Nexa DApp Tutorial</h1>
          <p className="text-sm text-muted-foreground">Follow the steps to build and deploy.</p>
        </div>
        <ProgressSteps current={0} steps={["Write Contract", "Compile", "Deploy", "Interact"]} />
        <div className="mt-6">
          <TutorialSidebar />
        </div>
      </aside>
      <section className="p-4 md:p-8">
        <TutorialEditor />
      </section>
    </main>
  )
}

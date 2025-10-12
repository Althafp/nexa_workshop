import { Hero } from "@/components/hero"
import { NexaBasics } from "@/components/nexa-basics"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="min-h-dvh">
      <Hero />
      <section className="mx-auto w-full max-w-6xl px-4 py-8 md:py-12">
        <NexaBasics />
      </section>
      <Footer />
    </main>
  )
}

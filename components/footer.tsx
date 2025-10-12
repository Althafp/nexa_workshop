import Link from "next/link"
import { Github, Twitter, MessageSquare } from "lucide-react"

export function Footer() {
  return (
    <footer className="mt-16 bg-foreground text-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
        <p className="text-center text-sm">Made with {"❤️"} for Nexa Blockchain Workshop</p>
        <div className="flex items-center gap-3">
          <Link aria-label="GitHub" href="https://github.com" target="_blank" className="opacity-90 hover:opacity-100">
            <Github className="h-5 w-5" />
          </Link>
          <Link
            aria-label="Discord"
            href="https://discord.com"
            target="_blank"
            className="opacity-90 hover:opacity-100"
          >
            <MessageSquare className="h-5 w-5" />
          </Link>
          <Link
            aria-label="Twitter"
            href="https://twitter.com"
            target="_blank"
            className="opacity-90 hover:opacity-100"
          >
            <Twitter className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  )
}

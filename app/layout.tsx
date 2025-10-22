import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "Nexa Blockchain Workshop",
  description: "Build Your First Nexa DApp",
  generator: "v0.app",
  icons: {
    icon: "/nexa.jpg",
    shortcut: "/nexa.jpg",
    apple: "/nexa.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      {/* use Space Grotesk for sans, Geist Mono for code */}
      <body className={`antialiased font-sans ${spaceGrotesk.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}

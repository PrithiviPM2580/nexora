import { Geist } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"
import Providers from "@/context/providers"

const geistSans = Geist({ subsets: ["latin"], variable: "--font--geist-sans" })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", geistSans.className, geistSans.variable)}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

import React from "react"
import QueryProvider from "./query-provider"
import { Toaster } from "sonner"
import { ThemeProvider } from "./theme-provider"

function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster position="top-center" duration={3000} richColors />
      </ThemeProvider>
    </QueryProvider>
  )
}

export default Providers

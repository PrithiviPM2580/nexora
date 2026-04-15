import React from "react"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session) {
    return redirect("/home")
  }

  return <div>{children}</div>
}

export default AuthLayout

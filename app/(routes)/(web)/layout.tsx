import React from "react"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

async function WebLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return redirect("/home")
  }
  return <div>WebLayout</div>
}

export default WebLayout

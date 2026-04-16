import React, { Suspense } from "react"
import { headers } from "next/headers"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import FallbackSpinner from "@/components/fallback-spinner"
import AppSidebar from "@/components/sidebar"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import MainContent from "./_common/main-content"
import NoteDialog from "@/components/note-dialog/note-dialog"

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session) {
    return redirect("/auth/sign-in")
  }
  return (
    <Suspense fallback={<FallbackSpinner />}>
      <NuqsAdapter>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="relative overflow-x-hidden pt-0">
            <MainContent>{children}</MainContent>
            <NoteDialog />
          </SidebarInset>
        </SidebarProvider>
      </NuqsAdapter>
    </Suspense>
  )
}

export default DashboardLayout

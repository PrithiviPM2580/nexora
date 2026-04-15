import React, { Suspense } from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { RiLoader5Fill } from "@remixicon/react"
import FallbackSpinner from "@/components/fallback-spinner"
import AppSidebar from "@/components/sidebar"

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<FallbackSpinner />}>
      <NuqsAdapter>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="relative overflow-x-hidden pt-0">
            {children}
          </SidebarInset>
        </SidebarProvider>
      </NuqsAdapter>
    </Suspense>
  )
}

export default DashboardLayout

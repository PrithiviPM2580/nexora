"use client"

import React, { useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "../ui/sidebar"
import { useRouter } from "next/navigation"
import { useAuthToken } from "@/hooks/use-auth-token"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import Logo from "../logo"
import NavUser from "./nav-user"

function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter()
  const { clearBearerToken } = useAuthToken()
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false)

  const { useSession, signOut } = authClient
  const { data: session, isPending } = useSession()

  const user = session?.user

  async function handleLogout() {
    if (isSigningOut) return
    setIsSigningOut(true)
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          clearBearerToken()
          router.push("/auth/sign-in")
          setIsSigningOut(false)
        },
        onError: (ctx) => {
          toast.error(ctx.error.message)
          setIsSigningOut(false)
        },
      },
    })
  }
  return (
    <Sidebar {...props} className="z-50">
      <SidebarHeader>
        <div className="flex w-full items-center justify-between">
          <Logo url="/home" />
          <SidebarTrigger className="-ms-4" />
        </div>
        <hr className="mx-2 -mt-px border-border" />
      </SidebarHeader>
      <SidebarContent className="overflow-x-hidden px-2 pt-2"></SidebarContent>
      <SidebarFooter>
        <hr className="mx-2 -mt-px border-border" />
        <NavUser
          isLoading={isPending}
          user={{ name: user?.name || "", email: user?.email || "" }}
          isSigningOut={isSigningOut}
          onSignOut={handleLogout}
        />
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar

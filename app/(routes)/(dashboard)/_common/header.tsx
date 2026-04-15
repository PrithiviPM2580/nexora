"use client"

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"

type HeaderProps = {
  title?: string
}

function Header({ title }: HeaderProps) {
  const { open, isMobile } = useSidebar()
  return (
    <header className="fixed inset-0 top-0 left-0 z-9 flex h-10 items-center bg-background/20 px-2 py-1 backdrop-blur-sm md:px-8">
      {(!open || isMobile) && <SidebarTrigger className="h-10" />}
    </header>
  )
}

export default Header

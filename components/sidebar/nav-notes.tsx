import React from "react"
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "../ui/sidebar"
import { RiAddLine } from "@remixicon/react"

function NavNotes() {
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>
          <h5>Notes</h5>
          <SidebarGroupAction className="mt-[1.5px] flex size-5.5 cursor-pointer items-center rounded-md border bg-primary/20">
            <RiAddLine className="size-5" />
            <span className="sr-only">Add Notes</span>
          </SidebarGroupAction>
        </SidebarGroupLabel>
        <SidebarGroupContent className="h-auto max-h-90 min-h-32 w-full overflow-y-hidden">
          <SidebarMenu>
            <SidebarMenuItem>No Notes</SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  )
}

export default NavNotes

import React from "react"
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar"
import { RiAddLine, RiFileTextLine, RiLoader5Fill } from "@remixicon/react"
import { useCreateNote, useNotes } from "@/features/use-note"
import LoaderOverlay from "../loader-overlay"
import { useNoteId } from "@/hooks/use-note-id"

function NavNotes() {
  const { noteId, setNoteId } = useNoteId()
  const { data, isPending } = useNotes()
  const { mutate, isPending: isLoading } = useCreateNote()

  const notes = data?.data ?? []
  const onCreate = () => {
    mutate({
      title: "United",
      content: "",
    })
  }
  return (
    <>
      <LoaderOverlay show={isLoading} />
      <SidebarGroup>
        <SidebarGroupLabel>
          <h5>Notes</h5>
          <SidebarGroupAction
            className="mt-[1.5px] flex size-5.5 cursor-pointer items-center rounded-md border bg-primary/20"
            onClick={onCreate}
          >
            <RiAddLine className="size-5" />
            <span className="sr-only">Add Notes</span>
          </SidebarGroupAction>
        </SidebarGroupLabel>
        <SidebarGroupContent className="mt-2 h-auto max-h-90 min-h-32 w-full overflow-y-hidden">
          <SidebarMenu>
            {notes.length === 0 ? (
              <div className="">No Notes</div>
            ) : isPending ? (
              <div className="flex items-center justify-center">
                <RiLoader5Fill className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              notes?.map((note) => {
                const isActive = note.id === noteId
                return (
                  <SidebarMenuItem key={note.id}>
                    <SidebarMenuButton
                      className="flex w-full items-center"
                      isActive={isActive}
                      onClick={() => setNoteId(note.id)}
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                        <RiFileTextLine className="h-4 w-4 text-primary" />
                      </span>
                      <h5 className="flex-1 truncate">{note.title}</h5>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  )
}

export default NavNotes

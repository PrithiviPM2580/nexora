import { useNoteId } from "@/hooks/use-note-id"
import React from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"
import NoteView from "./note-view"

function NoteDialog() {
  const { noteId, clearNoteId } = useNoteId()

  const isOpen = Boolean(noteId)

  const handleClose = () => {
    clearNoteId()
  }
  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="w-1/2 border-l p-0 sm:max-w-[50vw]" side="right">
        <SheetHeader className="border-b bg-muted px-4 py-2">
          <SheetTitle />
        </SheetHeader>
        <div className="max-h-screen min-h-20 flex-1 overflow-y-auto">
          {noteId && <NoteView noteId={noteId} />}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default NoteDialog

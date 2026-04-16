"use client"

import EmptyState from "@/components/empty-state"
import { Button } from "@/components/ui/button"
import { useCreateNote, useNotes } from "@/features/use-note"
import { useNoteId } from "@/hooks/use-note-id"
import { RiFile4Fill, RiFileTextLine, RiLoader5Fill } from "@remixicon/react"

function RecentNotes() {
  const { setNoteId } = useNoteId()
  const { data, isPending: isLoading } = useNotes()
  const { mutate, isPending } = useCreateNote()

  const notes = data?.data || []

  const onCreate = () => {
    mutate({
      title: "Untitled Note",
      content: "",
    })
  }

  const onClick = (id: string) => {
    setNoteId(id)
  }
  return (
    <div className="mt-1.5 w-full">
      <ul className="flex w-full flex-col gap-2">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <RiLoader5Fill className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : notes.length === 0 ? (
          <EmptyState
            isLoading={isLoading}
            title="No notes yet"
            iconClassName="w-8 h-8"
            onButtonClick={onCreate}
          />
        ) : (
          notes.map((note) => {
            return (
              <li key={note.id} className="relative">
                <Button
                  className="flex w-full items-center gap-2 rounded-sm py-5 text-left text-sm hover:bg-accent dark:text-black/80"
                  onClick={() => onClick(note.id)}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-secondary">
                    <RiFileTextLine className="h-4 w-4 text-primary" />
                  </span>
                  <h5 className="mt-1 flex-1 truncate">{note.title}</h5>
                </Button>
              </li>
            )
          })
        )}
      </ul>
    </div>
  )
}

export default RecentNotes

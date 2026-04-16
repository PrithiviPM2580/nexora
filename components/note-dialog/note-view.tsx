import { useNote, useUpdateNote } from "@/features/use-note"
import React, { useEffect, useState } from "react"

function NoteView({ noteId }: { noteId: string }) {
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")

  const { data, isPending: isLoading } = useNote(noteId)
  const { mutate, isPending } = useUpdateNote()

  const note = data?.data

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setContent(note.content)
    }
  }, [note])
  return <div>NoteView</div>
}

export default NoteView

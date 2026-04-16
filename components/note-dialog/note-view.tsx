import { useNote, useUpdateNote } from "@/features/use-note"
import React, { useEffect, useRef, useState } from "react"
import { RiLoader5Fill } from "@remixicon/react"
import { AutosizeTextarea, AutosizeTextAreaRef } from "../ui/autosize-textarea"
import { Button } from "../ui/button"

function NoteView({ noteId }: { noteId: string }) {
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const titleRef = useRef<AutosizeTextAreaRef | null>(null)
  const contentRef = useRef<AutosizeTextAreaRef | null>(null)

  const { data, isPending: isLoading } = useNote(noteId)
  const { mutate, isPending } = useUpdateNote()

  const note = data?.data

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setContent(note.content)
    }
  }, [note])

  useEffect(() => {
    if (!isLoading) {
      const titleTextAreaEle = titleRef.current
      if (titleTextAreaEle) {
        titleTextAreaEle.textArea.style.minHeight = "auto !important"
        titleTextAreaEle.textArea.style.maxHeight = "auto !important"
        titleTextAreaEle.textArea.focus()
      }
    }
  }, [isLoading])

  const handleUpdate = () => {}
  mutate({
    id: noteId,
    json: {
      title,
      content,
    },
  })

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      contentRef.current?.textArea.focus()
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-[20vh] w-full items-center justify-center">
        <RiLoader5Fill className="h-16 w-16 animate-spin text-primary" />
      </div>
    )
  }
  return (
    <div className="relative h-full w-full p-6">
      <div className="mb-3 w-full pl-2">
        <div className="border-b">
          <AutosizeTextarea
            ref={titleRef}
            onKeyDown={handleTitleKeyDown}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="United note..."
            className="w-full resize-none overflow-hidden border-none bg-transparent px-0 text-4xl leading-tight font-bold outline-none placeholder:text-muted-foreground/40 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>
      <div className="w-full pl-2">
        <AutosizeTextarea
          ref={contentRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing your note..."
          className="min-h-[65vh] w-full resize-none border-none bg-transparent px-0 text-base leading-relaxed outline-none placeholder:text-muted-foreground/40 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      <div className="sticky bottom-0 z-50 flex justify-end bg-background py-2">
        <Button
          onClick={handleUpdate}
          disabled={isPending || !noteId || !content}
          className="cursor-pointer rounded-full px-10 text-lg disabled:opacity-75"
          size={"lg"}
        >
          {isPending && <RiLoader5Fill className="h-7 w-7 animate-spin" />}
          Save Changes
        </Button>
      </div>
    </div>
  )
}

export default NoteView

import { useQueryState, parseAsString } from "nuqs"

export const useNoteId = () => {
  const [noteId, _setNoteId] = useQueryState(
    "noteId",
    parseAsString.withDefault("")
  )

  const setNoteId = (id: string) => _setNoteId(id)
  const clearNoteId = () => _setNoteId("")

  return {
    noteId,
    setNoteId,
    clearNoteId,
  }
}

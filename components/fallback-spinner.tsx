import { RiLoader5Fill } from "@remixicon/react"

function FallbackSpinner() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <RiLoader5Fill className="h-16 w-16 animate-spin text-primary" />
    </div>
  )
}

export default FallbackSpinner

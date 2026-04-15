import Link from "next/link"
import React from "react"

function Logo() {
  return (
    <Link href="/" className="flex w-fit items-center gap-2">
      <div className="flex size-8 items-center justify-center rounded-md bg-primary">
        <div className="size-3 rounded-full bg-white" />
      </div>
      <span className="text-base leading-tight font-medium text-foreground">
        Nexora
      </span>
    </Link>
  )
}

export default Logo

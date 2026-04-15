import Link from "next/link"
import React from "react"

function Logo() {
  return (
    <Link href="/" className="flex w-fit items-center gap-2">
      <div className="flex aspect-square size-8 items-center justify-center overflow-hidden rounded-md bg-primary text-primary-foreground">
        <div className="h-36 w-36 rounded-md bg-primary">
          <div className="h-12 w-12 rounded-full bg-white" />
        </div>
        <div className="flex-1 text-left text-base leading-tight">
          <span className="font-medium">Nexora</span>
        </div>
      </div>
    </Link>
  )
}

export default Logo

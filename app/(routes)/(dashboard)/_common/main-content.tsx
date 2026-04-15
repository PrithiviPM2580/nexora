"use client"

import React from "react"

type MainContentProps = {
  children: React.ReactNode
}

function MainContent({ children }: MainContentProps) {
  return (
    <>
      <main className="relative h-auto w-full overflow-hidden">{children}</main>
    </>
  )
}

export default MainContent

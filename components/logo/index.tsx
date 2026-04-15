import Link from "next/link"

interface LogoProps {
  url?: string
}

function Logo({ url = "/" }: LogoProps) {
  return (
    <Link href={url} className="flex w-fit items-center gap-2">
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

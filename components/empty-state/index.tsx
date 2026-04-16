import { cn } from "@/lib/utils"
import {
  RemixiconComponentType,
  RiAddLine,
  RiFileTextLine,
  RiLoader2Line,
} from "@remixicon/react"
import { Button } from "../ui/button"

type Props = {
  title: string
  description?: string
  icon?: RemixiconComponentType
  iconClassName?: string
  buttonText?: string
  isLoading?: boolean
  onButtonClick?: () => void
}
function EmptyState({
  title = "No record",
  description = "",
  icon: Icon = RiFileTextLine,
  iconClassName,
  buttonText = "Create",
  isLoading,
  onButtonClick,
}: Props) {
  return (
    <div className="py-12 text-center">
      <Icon
        className={cn(
          "mx-auto mb-4 h-16 w-16 text-muted-foreground",
          iconClassName
        )}
      />
      <h3 className="mb-3 text-lg font-medium">{title}</h3>
      {description && (
        <p className="mb-6 text-muted-foreground">{description}</p>
      )}
      {onButtonClick && (
        <Button
          onClick={onButtonClick}
          className="cursor-pointer"
          disabled={isLoading}
        >
          <RiAddLine className="mr-1 h-5 w-5" />
          {buttonText}
          {isLoading && <RiLoader2Line className="h-4 w-4 animate-spin" />}
        </Button>
      )}
    </div>
  )
}

export default EmptyState

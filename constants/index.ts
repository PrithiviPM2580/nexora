import { NavMenusItem } from "@/types"
import {
  RiScanLine,
  RiChatAiLine,
  RiBankCard2Line,
  RiSettings3Line,
} from "@remixicon/react"

export const NAV_MENUS: NavMenusItem[] = [
  {
    title: "Home",
    url: "/home",
    icon: RiScanLine,
  },
  {
    title: "AI Chat",
    url: "/chat",
    icon: RiChatAiLine,
  },
  {
    title: "Billing",
    url: "/billing",
    icon: RiBankCard2Line,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: RiSettings3Line,
  },
]

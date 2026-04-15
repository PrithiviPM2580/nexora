import { NavMenusItem } from "@/types"
import { usePathname, useRouter } from "next/navigation"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"

function NavMenu({ items }: { items: NavMenusItem[] }) {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.url

          return (
            <SidebarMenuItem
              key={item.title}
              className="relative flex flex-col items-stretch"
            >
              <SidebarMenuButton
                className="group/menu-button h-9 cursor-pointer rounded-md bg-linear-to-r font-medium hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 [&>svg]:size-auto"
                isActive={isActive}
                onClick={() => router.push(item.url)}
              ></SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </>
  )
}

export default NavMenu

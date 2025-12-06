import { BarChart2, Scale, BookOpen, BookText, Calendar, GraduationCap, Home, Inbox, Search, Settings, Trophy } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  {
    url: "#",
    icon: Home,
  },
  {
    url: "#",
    icon: Search,
  },
  {
    url: "#",
    icon: BookOpen,
  },
  {
    url: "#",
    icon: Trophy,
  },
  {
    url: "#",
    icon: Scale,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className=" bg-red-600">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="">
            <SidebarMenu className="">
              {items.map((item) => (
                <SidebarMenuItem className="" key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
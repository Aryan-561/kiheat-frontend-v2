"use client"

import * as React from "react"
import Link from "next/link"
import {
  Book,
  Home,
  Search,
  GraduationCap,
  User,
  CalculatorIcon,
  ScaleIcon,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,

} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Compare",
      url: "#",
      icon: ScaleIcon,
    },
    {
      title: "Toppers",
      url: "#",
      icon: User,
    },
    {
      title: "Estimate CGPA",
      url: "#",
      icon: CalculatorIcon,
    },
    {
      title: "Programmes",
      url: "#",
      icon: Book,
      isActive: true,
      items: [
        {
          title: "BCA",
          url: "#",
        },
        {
          title: "BBA",
          url: "#",
        },
        {
          title: "B.COM",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <GraduationCap className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-medium">KIHEAT Ranklist</span>

              </div>

            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

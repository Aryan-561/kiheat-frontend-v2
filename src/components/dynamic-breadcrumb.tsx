"use client"

import { usePathname, useRouter } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useProgrammes } from "@/hooks/use-programmes"

export function DynamicBreadcrumb() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: programmes } = useProgrammes()
  
  // Parse the pathname into segments
  const segments = pathname.split('/').filter(Boolean)
  
  // If we're on the home page
  if (segments.length === 0) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Home</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }
  
  // Build breadcrumb items
  const breadcrumbItems = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/')
    const isLast = index === segments.length - 1
    
    // Capitalize and format the segment
    let label = segment
    
    // Special handling for specific routes
    if (segment === 'programme') {
      label = 'Programme'
    } else if (segment === 'search') {
      label = 'Search'
    } else if (segment === 'dashboard') {
      label = 'Dashboard'
    } else if (segment === 'compare') {
      label = 'Compare'
    } else if (segment === 'toppers') {
      label = 'Toppers'
    } else if (segment === 'estimate-cgpa') {
      label = 'Estimate CGPA'
    } else if (/^\d{3}$/.test(segment)) {
      // Programme codes (e.g., 020, 018)
      label = segment
    } else if (/^\d{4}$/.test(segment)) {
      // Year/Batch (e.g., 2024)
      label = `Batch ${segment}`
    }
    
    return {
      href,
      label,
      isLast
    }
  })
  
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbItems.map((item, index) => (
          <div key={item.href} className="flex items-center gap-1.5">
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {item.isLast ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

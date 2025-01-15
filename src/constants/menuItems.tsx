import { type MenuItemType } from "../types"

export const menuItems: MenuItemType[] = [
    { 
      type: "Project",
      isLive: true,
      label: "Learn Like Me",
      hex: "6862F0",
      href: "https://llm.reedturgeon.com",
      segments: [12,13],
    },
    { 
      type: "Project",
      isLive: true,
      label: "🚧 CrowdPI",
      segments: [14,15],
    },
    { 
      type: "Social",
      isLive: true,
      label: "LinkedIn", 
      href: "https://www.linkedin.com/in/reedturgeon",
      iconType: "linkedin",
      segments: [1],
    },
    { 
      type: "Social",
      isLive: true,
      label: "GitHub", 
      href: "https://github.com/MrT3313",
      iconType: "github",
      segments: [3],
    },
]




import { FaGithub, FaLinkedin } from "react-icons/fa"
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
      isLive: false,
      label: "🚧 CrowdPI",
      segments: [14,15],
    },
    { 
      type: "Project",
      isLive: false,
      label: "🚧 AsyncDebate",
      segments: [16,17],
    },
    { 
      type: "Social",
      isLive: true,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/reedturgeon",
      iconType: "linkedin",
      segments: [2],
    },
    { 
      type: "Social",
      isLive: true,
      label: "GitHub", 
      href: "https://github.com/MrT3313",
      iconType: "github",
      segments: [3],
    },
    { 
      type: "Personal",
      isLive: false,
      label: "🚧 Finances",
      segments: [0],
    },
    { 
      type: "Personal",
      isLive: true,
      label: "Reach Out",
      href: "mailto:turgeon.dev+reedturgeon.com@gmail.com.com",
      iconType: "email",
      segments: [8],
    },
]




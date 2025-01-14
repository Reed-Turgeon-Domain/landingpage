import { FaGithub, FaLinkedin } from "react-icons/fa"

export type MenuItemType = {
  type: 'Project' | 'Social'
  isLive: boolean
  label: string
  href?: string
  segments?: number[]
  IconComponent?: typeof FaGithub | typeof FaLinkedin
}

export const menuItems: MenuItemType[] = [
    { 
      type: "Project",
      isLive: true,
      label: "Learn Like Me",
      href: "https://llm.reedturgeon.com",
      segments: [12,13],
    },
    // { 
    //   type: "Project",
    //   isLive: false,
    //   label: "🚧 CrowdPI",
    //   segment_size: 2,
    // },
    // { 
    //   type: "Project",
    //   isLive: false,
    //   label: "🚧 CheckIt",
    //   segment_size: 2,
    // },
    // { 
    //   type: "Project",
    //   isLive: false,
    //   label: "🚧 AsyncDebate",
    //   segment_size: 2,
    // },
    // { 
    //   type: "Social",
    //   isLive: true,
    //   label: "LinkedIn", 
    //   href: "https://www.linkedin.com/in/reedturgeon", 
    //   IconComponent: FaLinkedin,
    //   segment_size: 1,
    // },
    { 
      type: "Social",
      isLive: true,
      label: "GitHub", 
      href: "https://github.com/MrT3313", 
      IconComponent: FaGithub,
      segments: [3],
    },
]




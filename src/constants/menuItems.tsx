import { FaGithub, FaLinkedin } from "react-icons/fa"

export type MenuItem = {
  type: 'Project' | 'Social'
  isLive: boolean
  label: string
  angle: number
  href?: string
  IconComponent?: typeof FaGithub | typeof FaLinkedin
}

export const menuItems: MenuItem[] = [
    { 
      type: "Project",
      isLive: true,
      label: "Learn Like Me", 
      angle: -Math.PI * 0.8,
      href: "https://llm.reedturgeon.com" 
    },
    { 
      type: "Project",
      isLive: false,
      label: "🚧 CrowdPI",
      angle: -Math.PI * 0.6,
    },
    { 
      type: "Project",
      isLive: false,
      label: "🚧 CheckIt",
      angle: -Math.PI * 0.4,
    },
    { 
      type: "Project",
      isLive: false,
      label: "🚧 AsyncDebate",
      angle: -Math.PI * 0.2,
    },
    { 
      type: "Social",
      isLive: true,
      label: "LinkedIn", 
      angle: Math.PI * 0.33,
      href: "https://www.linkedin.com/in/reedturgeon", 
      IconComponent: FaLinkedin
    },
    { 
      type: "Social",
      isLive: true,
      label: "GitHub", 
      angle: Math.PI * 0.67,
      href: "https://github.com/MrT3313", 
      IconComponent: FaGithub
    },
]




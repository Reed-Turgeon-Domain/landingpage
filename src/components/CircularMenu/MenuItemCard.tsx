import { type ComponentType } from 'react'
import cx from 'classnames'

type MenuItemCardProps = {
  label: string
  IconComponent?: ComponentType<{ size: number }>
  position: { x: number; y: number }
}

const MenuItemCard = ({ 
    label, 
    IconComponent,
    position 
}: MenuItemCardProps) => {
    return (
        <div className={cx(
            "inline-flex items-center", 
            "gap-2", "px-2 py-1", 
            "bg-white rounded-md shadow-md",
            "bg-orange-500"
        )}>
            {IconComponent && <IconComponent size={20} />}
            <span className="whitespace-nowrap">{label}</span>
        </div>
    )
}

export default MenuItemCard 
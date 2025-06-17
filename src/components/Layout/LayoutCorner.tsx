import React from 'react'
import cx from 'classnames'

// HELPERS
const cornerClasses = {
  'top-left': {
    2: 'top-2 left-2',
    4: 'top-4 left-4',
    6: 'top-6 left-6',
    8: 'top-8 left-8',
  },
  'top-right': {
    2: 'top-2 right-2',
    4: 'top-4 right-4',
    6: 'top-6 right-6',
    8: 'top-8 right-8',
  },
  'bottom-left': {
    2: 'bottom-2 left-2',
    4: 'bottom-4 left-4',
    6: 'bottom-6 left-6',
    8: 'bottom-8 left-8',
  },
  'bottom-right': {
    2: 'bottom-2 right-2',
    4: 'bottom-4 right-4',
    6: 'bottom-6 right-6',
    8: 'bottom-8 right-8',
  },
};

// TYPES
type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
type Inset = 2 | 4 | 6 | 8

type LayoutCornerProps = {
  children: React.ReactNode
  corner: Corner
  inset?: Inset
  background?: {
    default?: string
    hover?: string
  }
  border?: {
    default?: string
    hover?: string
  }
}

export const LayoutCorner: React.FC<LayoutCornerProps> = ({
  children,
  corner,
  background = {
    default: 'bg-transparent',
    hover: 'hover:bg-teal-500/70'
  },
  border = {
    default: 'border-1 border-white',
    hover: 'hover:border-teal-500/70'
  },
  inset = 2,
  // className,
}) => {

  return (
    <div
      className={cx(
        'absolute z-50',
        cornerClasses[corner][inset],
        
        background.default,
        background.hover,

        border.default,
        border.hover,

        'rounded-lg',
        'text-white',
      )}
    >
      {children}
    </div>
  );
};
import cx from 'classnames'
import { useState, useRef, useEffect } from 'react'
import type { WeeklySubmissionData } from '../../types'
import moment from 'moment'

// MOCK DATA
import { wdydtwData as mockData } from './mock'

// COMPONENTS
import { WeeklySubmission } from './WeeklySubmission'

const ExpandingTitle = ({ onHoverChange, onClick, isOpen }: { 
  onHoverChange: (isHovered: boolean) => void
  onClick: () => void
  isOpen: boolean 
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const words = ['What', 'Did', 'You', 'Do', 'This', 'Week']
  
  const handleHoverChange = (newHoverState: boolean) => {
    setIsHovered(newHoverState)
    onHoverChange(newHoverState)
  }

  return (
    <span 
      className={cx(
        "flex justify-center items-center w-full transition-all duration-300 ease-in-out cursor-pointer",
        { 'pb-0': !isOpen }
      )}
      onMouseEnter={() => handleHoverChange(true)}
      onMouseLeave={() => handleHoverChange(false)}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
    >
      {isHovered || isOpen ? (
        <span className="flex justify-center items-center w-full bg-gray-200 italic">
          {words.map((word, index) => (
            <span key={index} className={cx(
              index === words.length - 1 ? 'mr-0' : 'mr-1'
            )}>
              <span className="font-bold">{word[0]}</span>
              <span className="text-xs">{word.slice(1)}</span>
            </span>
          ))}
          <span>?</span>
        </span>
      ) : (
        <span className="flex w-full font-bold italic justify-center bg-gray-200">WDYDTW?</span>
      )}
    </span>
  )
}

const WDYDTW = ({ 
  data = mockData,
  today = moment().toDate()
}: { 
  data: any[] 
  today: Date
}) => {
  const [filteredData, setFilteredData] = useState<{
    isOpen: any[],
    isOpenFull: any[]
  }>({
    isOpen: [],
    isOpenFull: []
  })
  const [shuffleTrigger, setShuffleTrigger] = useState(Date.now())
  const [isOpen, setIsOpen] = useState(true)
  const [isOpenFull, setIsOpenFull] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!data) return
    const filter = process.env.NODE_ENV === 'production' ? true : false

    if (!filter) {
      const update = {
        isOpen: [...data].reverse(),
        isOpenFull: data
      }
      setFilteredData(update)
    } else {
      const filtered = data.filter(el => {
        const today = new Date()
        return el.dates && today >= new Date(el.dates.end)
      })
      const update = {
        isOpen: [...filtered].reverse(),
        isOpenFull: filtered
      }
      setFilteredData(update)
    }
  }, [data])

  const handleHoverChange = () => {
    setShuffleTrigger(Date.now())
  }

  const handleClick = () => {
    setIsOpen(!isOpen)
    setIsOpenFull(false)
  }

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  const handleMouseLeave = () => {
    if (isOpen || isOpenFull) {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false)
        setIsOpenFull(false)
      }, 300)
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={modalRef}
      className={cx(
        filteredData?.isOpen?.length > 0 ? 'flex flex-col' : 'hidden',
        'absolute bottom-0 right-0',
        "border-2",
        {
          'w-[400px]': isOpen,
          'w-[250px]': !isOpen
        },
        {
          'h-screen': isOpenFull,
          'h-[300px]': isOpen && !isOpenFull,
          'h-[28px]': !isOpen
        },
        'rounded',
        'bg-white',
        'z-10',
        'transition-all duration-300 ease-in-out',
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={cx(
        'flex',
        "w-full",
        'items-center justify-center',
        "bg-transparent",
        "z-20",
        { 'p-0': !isOpen }
      )}>
        <ExpandingTitle 
          onHoverChange={handleHoverChange} 
          onClick={handleClick}
          isOpen={isOpen}
        />
      </div>

      <div className={cx(
        'flex',
        'flex-1',
        'relative',
        'items-center',
        'px-4',
        'transition-all duration-300 ease-in-out',
        {
          'opacity-100': isOpen,
          'opacity-0 h-0': !isOpen,
          'flex-col gap-4 pt-4 overflow-y-auto': isOpenFull,
          'overflow-hidden': !isOpenFull
        }
      )}>
        {isOpenFull 
        ? filteredData.isOpenFull.map((ws, index) => (
          <WeeklySubmission 
            key={`${index}-${shuffleTrigger}`}
            data={ws} 
            index={index}
            total={filteredData.isOpenFull.length}
            onClick={() => setIsOpenFull(!isOpenFull)}
            isOpenFull={isOpenFull}
          />
        ))
        : filteredData.isOpen.map((ws, index) => (
          <WeeklySubmission 
            key={`${index}-${shuffleTrigger}`}
            data={ws} 
            index={index}
            total={filteredData.isOpen.length}
            onClick={() => setIsOpenFull(!isOpenFull)}
            isOpenFull={isOpenFull}
          />
        ))}
      </div>
    </div>
  )
}

export { WDYDTW }
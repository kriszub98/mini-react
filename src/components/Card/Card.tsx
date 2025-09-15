import React, { useState, useRef, useEffect } from 'react'
import CardItem from './CardItem';
import './Card.css'

interface CardProps {
    label: string;
    accent?: string;
}


const Card = ({label, accent}: CardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null);
  const items = [
    {id: 1, label: 'First Item'},
    {id: 2, label: 'Second Item'},
  ]

  useEffect(() => {
    if(isOpen && contentRef.current ) {
      setHeight(contentRef.current.scrollHeight)
    } else {
      setHeight(0)
    }
  }, [isOpen])
  

  const toggleCard = () => {
      setIsOpen(open => !open)
  }

  const getItems = () => {
    return items.map(i => {
      return <CardItem key={i.id} label={i.label} />
    })
  }


  return (
    <div className='Card' onClick={toggleCard}>
      <div className="Card__top">
        <span className="Card__label">{label}</span>
        <div className="Card__accent" style={{backgroundColor: accent ? accent : '#bbaacc'}}></div>
      </div>

      {isOpen && <div className='Card__items' style={{maxHeight: `${height}px`}} ref={contentRef}>{getItems()}</div>}
    </div>
  )
}

export default Card
import React from 'react'
import './CardItem.css'
import Button from '../Button/Button';

interface CardItemProps {
  label: string;
}

const CardItem = ({label}: CardItemProps) => {
  return (
    <div className='Card__Item'>
      <span>{label}</span>
      <Button onClick={()=>console.log('Pressed')} label="Click me" accent="#fcfc" />
    </div>
  )
}

export default CardItem
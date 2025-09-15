import React from 'react'
import './Button.css';

interface ButtonProps {
  label: string;
  accent: string | null;
  onClick: () => void;
}

const Button = ({label, onClick, accent}: ButtonProps) => {
  return (
    <button className='Button' style={{borderColor: accent ? accent : 'red', color: accent ? accent : 'red'}} onClick={onClick}>{label}</button>
  )
}

export default Button
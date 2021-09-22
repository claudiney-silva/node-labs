import React from 'react'

import './index.css'

interface Props {
  label: string
  active: boolean
  click: Function
}

export const Button: React.FC<Props> = ({ label, active, click }: Props) => {
  return (
    <button
      type="button"
      className={`button ${active ? 'active' : ''}`}
      onClick={() => click()}
    >
      {label}
    </button>
  )
}

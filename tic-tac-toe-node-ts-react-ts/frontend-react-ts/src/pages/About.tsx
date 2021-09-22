import React from 'react'
import { useHistory } from 'react-router-dom'

import './About.css'

export const About: React.FC = () => {
  const history = useHistory()

  return (
    <div className="About">
      <h1>Sobre o Jogo</h1>
      <p>
        Este Jogo da Velha foi desenvolvido utilizando uma API Backend em
        Node/Typescript e o Frontend com React/Redux/Typescript.
      </p>
      <p>
        <strong>Autor: </strong>Claudiney Calixto da Silva
      </p>
      <p>
        <strong>E-mail: </strong>clau.li.erd@gmail.com
      </p>
      <button
        type="button"
        className="btn blue"
        cy-data="go-back-button"
        onClick={() => history.push('/')}
      >
        Voltar
      </button>
    </div>
  )
}

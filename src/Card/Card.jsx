import React, { useEffect, useState } from 'react'
import { URL_POKEMON } from '../api/apiRest'
import css from './card.module.scss'
import axios from 'axios'

export default function Card({card}) {

  const [itemPokemon, setItemPokemon] = useState({})

  useEffect(()=> {
    const dataPokemon = async ()=>{
      const api = await axios.get(`${URL_POKEMON}/${card.name}`)
      
      setItemPokemon(api.data)
    }

    dataPokemon()
  })

  return (
    <div>
      <img src={itemPokemon?.sprites?.other["official-artwork"]?.front_default} alt="Pokemon" />

    </div>
  )
}

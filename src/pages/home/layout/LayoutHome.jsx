import React, { useEffect, useState } from 'react'
import { URL_POKEMON } from '../../../api/apiRest'
import Header from '../header/Header'
import Card from '../../../Card/Card'
import css from './layout.module.scss'
import axios from "axios";

export default function LayoutHome() {

  const [arrayPokemon, setArrayPokemon] = useState([])

  

  useEffect(() => {
    const api = async () => {
      const apiPoke = await axios.get(`${URL_POKEMON}`); 

      setArrayPokemon(apiPoke.data.results);
    }
    api();
  }, [])
  


  return (
    <div className={css.layout}>
      <Header/>

      <div>
        {arrayPokemon.map((card, index) => {
          return <Card key={index} card={card}/>
        })}
      </div>
    </div>
  )
}

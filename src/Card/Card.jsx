import React, { useEffect, useState } from 'react';
import { URL_ESPECIES, URL_EVOLUCIONES, URL_POKEMON } from '../api/apiRest';
import css from './card.module.scss';
import axios from 'axios';
import './../styles/index.scss';

export default function Card({ card }) {
  const [itemPokemon, setItemPokemon] = useState({});
  const [especiePokemon, setEspeciePokemon] = useState({});
  const [evoluciones, setEvoluciones] = useState([]);


  useEffect(() => {
    const dataPokemon = async () => {
      const api = await axios.get(`${URL_POKEMON}/${card.name}`);
      setItemPokemon(api.data);
    };
    dataPokemon();
  }, [card]);

  useEffect(() => {
    const dataEspecie = async () => {
      const URL = card.url.split("/");
      const api = await axios.get(`${URL_ESPECIES}/${URL[6]}`);
      setEspeciePokemon({
        url_especie: api?.data?.evolution_chain?.url,
        data: api?.data
      });
    };
    dataEspecie();
  }, [card]);

  useEffect(() => {
    async function getPokemonImagen(id) {
      const response = await axios.get(`${URL_POKEMON}/${id}`);
      return response?.data?.sprites?.other["official-artwork"]?.front_default;
    }

    if (especiePokemon?.url_especie) {
      const obtenerEvoluciones = async () => {
        const arrayEvoluciones = [];
        const URL = especiePokemon?.url_especie?.split("/");
        const api = await axios.get(`${URL_EVOLUCIONES}/${URL[6]}`);
        
        // Acceso a evoluciones
        let currentChain = api?.data?.chain;
        while (currentChain) {
          const speciesUrl = currentChain?.species?.url?.split("/");
          const speciesId = speciesUrl[6];
          const img = await getPokemonImagen(speciesId);

          arrayEvoluciones.push({
            img: img,
            name: currentChain?.species?.name,
          });

          currentChain = currentChain.evolves_to[0]; // Mover al siguiente eslabón de la cadena de evolución
        }

        setEvoluciones(arrayEvoluciones);
      };
      obtenerEvoluciones();
    }
  }, [especiePokemon]);

  let pokeId = itemPokemon?.id?.toString();
  if (pokeId?.length === 1) {
    pokeId = "00" + pokeId;
  } else if (pokeId?.length === 2) {
    pokeId = "0" + pokeId;
  }

  return (
    <div className={css.card}>
      <img className={css.img_poke} src={itemPokemon?.sprites?.other["official-artwork"]?.front_default} alt="Pokemon" />
      <div className={`bg-${especiePokemon?.data?.color?.name} ${css.sub_card}`}>
        <strong className={css.id_card}>{pokeId}</strong>
        <strong className={css.name_card}>{itemPokemon.name}</strong>
        <h4 className={css.altura_poke}>Altura : {itemPokemon.height * 10} cm</h4>
        <h4 className={css.peso_poke}>Peso : {itemPokemon.weight / 10} Kg</h4>
        <h4 className={css.habitat_poke}>Habitat: {especiePokemon?.data?.habitat?.name} {" "}</h4>

        <div className={css.div_stats}>
          {itemPokemon?.stats?.map((sta, index) => (
            <h6 key={index} className={css.item_stats}>
              <span className={css.name}>{sta.stat.name}</span>
              <progress value={sta.base_stat} max={110}></progress>
              <span className={css.numero}>{sta.base_stat}</span>
            </h6>
          ))}
        </div>

        <div className={css.div_type_color}>
          {itemPokemon?.types?.map((ti, index) => (
            <h6 key={index} className={`color-${ti.type.name} ${css.color_type}`}>
              {" "}
              {ti.type.name}
            </h6>
          ))}
        </div>

        <div className={css.div_evolucion}>
          {evoluciones.map((evo, index) => (
            <div className={css.item_evo} key={index}>
              <img src={evo.img} alt={`Evolución ${evo.name}`} className={css.img} />
              <h6>{evo.name}</h6>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

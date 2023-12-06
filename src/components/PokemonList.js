import { useEffect, useState } from "react";

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadPokemon() {
      try {
        const offset = (currentPage - 1) * 20;
        const apiURL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}`;

        const response = await fetch(apiURL);
        const data = await response.json();
        setPokemon(data.results);
      } catch (error) {
        console.log(error);
      }
    }

    loadPokemon();
  }, [currentPage]);

  return (
    <main>
      <button
        type="button"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous Page
      </button>
      <button type="button" onClick={() => setCurrentPage(currentPage + 1)}>
        Next Page
      </button>
      <ul>
        {pokemon.map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </main>
  );
}

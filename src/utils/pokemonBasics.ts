import type { Pokemon } from "@/types/pokemonTypes";

export function mapPokemonDetails(pokemonData: any): Pokemon {
  const mappedPokemon = {
    name: pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1),
    url: pokemonData.species?.url || "",
    imageFront: pokemonData.sprites?.front_default || "",
    imageBack: pokemonData.sprites?.back_default || "",
    types: pokemonData.types.map((type: { type: { name: string } }) => ({
      name: type.type.name, // ✅ Ahora coincide con la interfaz { name: string }
    })),
    height: pokemonData.height,
    weight: pokemonData.weight,
  };

  // console.log("Mapped Pokemon:", mappedPokemon); // Para depuración
  return mappedPokemon;
}

import { defineStore } from "pinia";
import { ref } from "vue";

import type { Pokemon } from "@/types/pokemonTypes";

export const useFavoritePokemonStore = defineStore(
  "favoritePokemon",
  () => {
    // Almacena los Pokémon favoritos
    const favoritePokemon = ref<Pokemon[]>([]);
    // Acción para agregar un Pokémon a favoritos
    function addFavoritePokemon(pokemon: Pokemon) {
      const exists = favoritePokemon.value.some((p) => p.name === pokemon.name);
      if (!exists) {
        favoritePokemon.value.push(pokemon);
      }
    }
    // Acción para eliminar un Pokémon de favoritos
    function removeFavoritePokemon(pokemonName: string) {
      favoritePokemon.value = favoritePokemon.value.filter(
        (p) => p.name !== pokemonName
      );
    }
    function isFavoritePokemon(pokemonName: string): boolean {
      return favoritePokemon.value.some((p) => p.name === pokemonName);
    }

    return {
      favoritePokemon,
      addFavoritePokemon,
      removeFavoritePokemon,
      isFavoritePokemon,
    };
  },
  {
    persist: true,
  }
);

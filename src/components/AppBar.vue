<template>
  <v-app-bar :elevation="2" rounded class="mb-9">
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>Pokemons</v-app-bar-title>
    <template v-slot:append>
      <v-btn :icon="mdiHeart"></v-btn>
      <!-- <v-btn :icon="mdiMagnify" @click="searchPokemon"></v-btn> -->
      <v-text-field
        v-model="search"
        density="compact"
        label="Search"
        :prepend-inner-icon="mdiMagnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
        @keyup.enter="searchPokemon"
      ></v-text-field>
    </template>
  </v-app-bar>
  <!-- Mostrar el componente PokemonSingleCard si el Pokémon existe -->
  <PokemonSingleCard
    v-if="pokemon"
    :pokemon="pokemon"
    v-model:showDialog="showDialog"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getPokemon } from "../api/pokemonServices";
import { mdiMagnify, mdiHeart } from "@mdi/js";
import PokemonSingleCard from "./PokemonSingleCard.vue";

export interface Pokemon {
  name: string;
  url: string;
  imageFront: string;
  imageBack: string;
  types: PokemonTypes[];
  height: number;
  weight: number;
}
interface PokemonTypes {
  slot: number;
  type: {
    name: string;
  };
}

// Estado para almacenar el valor de búsqueda
const search = ref("");
// Estado para almacenar los datos del Pokémon encontrado
const pokemon = ref<Pokemon[] | null>(null);
// Estado para controlar la visibilidad del diálogo
const showDialog = ref(false);

// Función para buscar un Pokémon
const searchPokemon = async () => {
  if (search.value.trim()) {
    try {
      // Llama a la API para obtener los datos del Pokémon
      const pokemonData = await getPokemon(search.value.toLowerCase());
      pokemon.value = {
        ...pokemonData, // Copiamos todos los datos del Pokémon
        name:
          pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1), // Convertimos el nombre a mayúsculas
        imageFront: pokemonData.sprites?.front_default ?? "", // Agregamos la imagen frontal
        imageBack: pokemonData.sprites?.back_default ?? "", // Agregamos la imagen trasera
        types: pokemonData.types.map((type: { type: { name: string } }) => ({
          name: type.type.name,
        })), // Mapeamos los tipos
        height: pokemonData.height, // Agregamos la altura
        weight: pokemonData.weight, // Agregamos el peso
      };

      console.log("Pokémon encontrado:", pokemon.value);
      showDialog.value = true; // Abrir el diálogo
    } catch (error) {
      console.error("Pokémon no encontrado:", error);
      alert("Pokémon no encontrado. Intenta con otro nombre.");
      pokemon.value = null; // Limpiar los datos si no se encuentra el Pokémon
      showDialog.value = false; // Cerrar el diálogo
    }
  } else {
    alert("Por favor, ingresa un nombre de Pokémon.");
  }
};
</script>

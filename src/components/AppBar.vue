<template>
  <v-app-bar :elevation="2">
    <v-container class="d-flex align-center py-0 my-0">
      <v-app-bar-title>Pokemons</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        density="compact"
        label="Search"
        :prepend-inner-icon="mdiMagnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
        style="max-width: 300px"
        @keyup.enter="searchPokemon"
      ></v-text-field>
    </v-container>
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
import { mapPokemonDetails } from "@/utils/pokemonBasics";
import { mdiMagnify } from "@mdi/js";
import PokemonSingleCard from "./PokemonSingleCard.vue";
import type { Pokemon } from "@/types/pokemonTypes";

// Estado para almacenar el valor de búsqueda
const search = ref("");
// Estado para almacenar los datos del Pokémon encontrado
const pokemon = ref<Pokemon | null>(null);
// Estado para controlar la visibilidad del diálogo
const showDialog = ref(false);

// Función para buscar un Pokémon
const searchPokemon = async () => {
  if (search.value.trim()) {
    try {
      // Llama a la API para obtener los datos del Pokémon
      const pokemonData = await getPokemon(search.value.toLowerCase());
      pokemon.value = mapPokemonDetails(pokemonData);

      // console.log("Pokémon encontrado:", pokemon.value);
      showDialog.value = true; // Abrir el diálogo
    } catch (error) {
      console.error("Pokémon no encontrado:", error);
      // alert("Pokémon no encontrado. Intenta con otro nombre.");
      pokemon.value = null; // Limpiar los datos si no se encuentra el Pokémon
      showDialog.value = false; // Cerrar el diálogo
    }
  } else {
    console.error("No se pueden cargar los Pokémon sin un nombre.");
    // alert("Por favor, ingresa un nombre de Pokémon.");
  }
};
</script>
<style scoped>
.v-toolbar__content {
  max-width: 1280px; /* O el ancho de tu v-container */
  width: 100%;
  margin: 0 auto;
}
</style>

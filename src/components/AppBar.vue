<template>
  <v-app-bar :elevation="2" rounded class="mb-9">
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>Pokemons</v-app-bar-title>
    <template v-slot:append>
      <v-btn :icon="mdiHeart"></v-btn>
      <!-- <v-btn :icon="mdiMagnify" @click="searchPokemon"></v-btn> -->
      <!-- <v-text-field
        v-model="search"
        density="compact"
        label="Search"
        :prepend-inner-icon="mdiMagnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
      ></v-text-field> -->
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getAllPokemons, getPokemon } from "../api/pokemonServices";
import { mdiMagnify, mdiHeart } from "@mdi/js";
const searchQuery = ref("");

// Función para buscar Pokémon
const searchPokemon = () => {
  if (searchQuery.value.trim()) {
    console.log("Buscando Pokémon:", searchQuery.value);
    // Aquí puedes llamar a una API o filtrar una lista de Pokémon
  } else {
    console.log("Por favor, ingresa un nombre de Pokémon.");
  }
};
</script>

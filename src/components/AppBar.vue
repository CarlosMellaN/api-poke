<template>
  <v-app-bar :elevation="2" height="80">
    <v-container class="d-flex align-center py-0 my-0">
      <router-link to="/">
        <v-app-bar-title class="mx-auto"
          ><img
            src="@/assets/pokemon_logo.svg"
            alt="Pokémon Logo"
            style="height: 65px"
        /></v-app-bar-title>
      </router-link>
      <v-spacer></v-spacer>
      <router-link to="/favorites" class="text-decoration-none">
        <v-btn icon class="ml-4" color="red">
          <v-icon :icon="mdiHeart"></v-icon>
        </v-btn>
      </router-link>
      <!-- <router-link to="/about">
        <p>about</p>
      </router-link> -->
      <v-text-field
        v-model="search"
        density="compact"
        label="Search Pokémon"
        :prepend-inner-icon="mdiMagnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
        style="max-width: 300px"
        @keyup.enter="searchPokemon"
        @click:append-inner="isLoading ? null : searchPokemon"
      ></v-text-field>
    </v-container>
  </v-app-bar>
  <PokemonSingleCard
    v-if="pokemon"
    :pokemon="pokemon"
    v-model:showDialog="showDialog"
  />
  <v-snackbar v-model="showError" color="error" timeout="3000">
    {{ errorMessage }}
    <template v-slot:actions>
      <v-btn variant="text" @click="showError = false"> X </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getPokemon } from "../api/pokemonServices";
import { mapPokemonDetails } from "@/utils/pokemonBasics";
import { mdiMagnify, mdiHeart } from "@mdi/js";
import PokemonSingleCard from "./PokemonSingleCard.vue";
import type { Pokemon } from "@/types/pokemonTypes";

const search = ref("");
const pokemon = ref<Pokemon | null>(null);
const showDialog = ref(false);
const isLoading = ref(false);
const showError = ref(false);
const errorMessage = ref(
  "No se pudo encontrar el Pokémon. Intenta con otro nombre."
);

const searchPokemon = async () => {
  if (search.value.trim()) {
    try {
      isLoading.value = true;
      const pokemonData = await getPokemon(search.value.toLowerCase().trim());
      pokemon.value = mapPokemonDetails(pokemonData);
      showDialog.value = true;
    } catch (error) {
      console.error("Pokémon no encontrado:", error);
      pokemon.value = null;
      showDialog.value = false;
      showError.value = true;
    } finally {
      isLoading.value = false;
    }
  } else {
    errorMessage.value =
      "Por favor, ingresa el nombre de un Pokémon para buscar.";
    showError.value = true;
  }
};
</script>
<style scoped>
.v-toolbar__content {
  max-width: 1280px;
  margin: 0 auto;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.mdi-loading {
  animation: spin 1s linear infinite;
}
</style>

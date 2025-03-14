<template>
  <v-container class="mb-12" no-gutters>
    <v-row align="start" no-gutters v-if="favorites && favorites.length">
      <v-col
        v-for="favoritePokemon in favorites"
        :key="favoritePokemon.name"
        cols="12"
        md="4"
        sm="6"
      >
        <PokemonCard :pokemon="favoritePokemon" />
      </v-col>
    </v-row>
    <div v-else>No tienes favoritos</div>
  </v-container>
</template>
<script setup lang="ts">
import PokemonCard from "../components/PokemonCard.vue";
import { useFavoritePokemonStore } from "@/stores/pokemonStore";
import { computed } from "vue";
const favoritesStore = useFavoritePokemonStore();
const favorites = computed(() => favoritesStore.favoritesPokemons);
</script>
<style scoped>
.v-container {
  margin-top: 56px;
}
</style>

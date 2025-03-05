<template>
  <v-card
    class="mx-auto ma-5 pa-4 custom-shadow custom-hover-shadow"
    @click="showDialog = true"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    max-width="344"
  >
    <v-img max-height="300px" :src="pokemon.imageFront" cover></v-img>
    <v-card-title class="font-weight-bold grey-darken-4">
      {{ pokemon.name }}</v-card-title
    >
    <v-card-subtitle>
      Types:
      <v-chip
        v-for="(type, index) in pokemon.types"
        :key="index"
        class="ma-1"
        color="primary"
        small
      >
        {{ type.name }}
      </v-chip>
    </v-card-subtitle>
  </v-card>
  <!-- Componente PokemonSingleCard -->
  <PokemonSingleCard :pokemon="pokemon" v-model:showDialog="showDialog" />
</template>
<script setup lang="ts">
import { ref, defineProps } from "vue";
import PokemonSingleCard from "./PokemonSingleCard.vue";
import type { Pokemon } from "@/types/pokemonTypes";

const hover = ref(false);
const showDialog = ref(false);
defineProps<{ pokemon: Pokemon }>();
</script>
<style>
.custom-shadow {
  background-color: white !important; /* Asegura que la card no cambie de color */
}
.custom-hover-shadow {
  transition: box-shadow 0.3s ease-in-out;
}
.custom-hover-shadow:hover {
  box-shadow: 0px 10px 20px #e0e0e0 !important; /* Verde */
}
</style>

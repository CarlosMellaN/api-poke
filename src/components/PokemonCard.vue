<template>
  <v-card
    class="mx-auto ma-5 pa-4"
    @click="showDialog = true"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    :class="{ 'elevation-12': hover }"
    max-width="344"
  >
    <v-img max-height="300px" :src="pokemon.imageFront" cover></v-img>
    <v-card-title> {{ pokemon.name }}</v-card-title>
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

interface Pokemon {
  name: string;
  url: string;
  imageFront: string;
  imageBack: string;
  types: PokemonTypes[];
  height: number;
  weight: number;
}

interface PokemonTypes {
  type: {
    name: string;
  };
}

const hover = ref(false);
const props = defineProps<{ pokemon: Pokemon }>();

const showDialog = ref(false);
</script>

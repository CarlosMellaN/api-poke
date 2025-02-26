<template>
  <v-card
    class="mx-auto ma-5 pa-4"
    @click="showDialog = true"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    :class="{ 'elevation-12': hover }"
    max-width="344"
  >
    <v-img max-height="300px" :src="pokemon.image" cover></v-img>
    <v-card-title> {{ pokemon.name }} </v-card-title>
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
  <!-- Diálogo modal para la información detallada -->
  <v-dialog v-model="showDialog" max-width="600">
    <v-card>
      <v-card-title class="text-h5">
        {{ pokemon.name }}
      </v-card-title>
      <v-card-text>
        <v-img :src="pokemon.image" cover></v-img>
        <p>
          <strong>URL:</strong>
          <a :href="pokemon.url" target="_blank">{{ pokemon.url }}</a>
        </p>
        <strong>Types:</strong>
        <v-chip
          v-for="(type, index) in pokemon.types"
          :key="index"
          class="ma-1"
          color="primary"
          small
        >
          {{ type.name }}
        </v-chip>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="showDialog = false">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref, defineProps } from "vue";
import { mdiChevronUp, mdiChevronDown } from "@mdi/js";

interface Pokemon {
  name: string;
  url: string;
  image: string;
  types: PokemonTypes[];
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
<style scoped>
.v-card-title {
  font-size: 24px;
}
</style>

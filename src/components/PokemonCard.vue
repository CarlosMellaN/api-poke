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
    <v-card-title> {{ pokemon.name }} {{ showDialog }}</v-card-title>
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
  <PokemonSingleCard :pokemon="pokemon" v-model:showDialog="showDialog" />
  <!-- Diálogo modal para la información detallada
  <v-dialog v-model="showDialog" max-width="600">
    <v-card>
      <v-card-text>
        <v-row>
          <v-col col="6"
            ><v-img :src="pokemon.imageFront" max-height="200px"></v-img
          ></v-col>
          <v-col col="6"
            ><v-img :src="pokemon.imageBack" max-height="200px"></v-img
          ></v-col>
        </v-row>
        <v-card-title>
          {{ pokemon.name }}
        </v-card-title>
        <v-card-subtitle>
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
          <p><strong>Height:</strong> {{ pokemon.height }}</p>
          <p><strong>Weight:</strong> {{ pokemon.weight }}</p>
        </v-card-subtitle>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="showDialog = false">X</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog> -->
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
console.log("showDialog en el padre:", showDialog.value);
console.log("Pokemon en el padre:", props.pokemon);
</script>
<style scoped>
.v-card-title {
  font-size: 24px;
}
</style>

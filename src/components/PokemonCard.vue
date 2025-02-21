<template>
  <v-card class="mx-auto" max-width="344">
    <v-img height="200px" :src="pokemon.image" cover></v-img>
    <!-- {{ pokemon }} -->
    <v-card-title> {{ pokemon.name }} </v-card-title>
    <!-- <v-card-subtitle> tipo {{ pokemon.types.map((t) => t.type.name).join(', ') }} </v-card-subtitle> -->
    <v-card-subtitle v-if="pokemon?.types?.length">
      Types: {{ props.pokemon.types.join(', ') }}
    </v-card-subtitle>
    <v-card-actions>
      <v-btn color="orange-lighten-2" text="Explore"></v-btn>
      <v-spacer></v-spacer>
      <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text> descripcion pokemon </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>
<script setup lang="ts">
import { ref, defineProps } from 'vue'

interface Pokemon {
  name: string
  url: string
  image: string
  types: PokemonTypes[]
}

interface PokemonTypes {
  slot: number
  type: {
    name: string
    url: string
  }
}

const props = defineProps<{ pokemon: Pokemon }>()

console.log(props.pokemon.types.join(', '))

const show = ref(false)
</script>
<style scoped>
.v-card-title {
  font-size: 24px;
}
</style>

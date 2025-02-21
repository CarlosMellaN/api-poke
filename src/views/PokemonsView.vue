<template>
  <v-container class="mb-12" no-gutters>
    <v-row>
      <v-col>
        <h2>Pokemons</h2>
      </v-col>
    </v-row>
    <v-row
      align="start"
      style="height: 150px"
      no-gutters
      v-if="pokemonsList && pokemonsList.length"
    >
      <v-col
        v-for="pokemon in pokemonsList"
        :key="pokemon.name"
        md="4"
        sm="6"
        class="d-flex flex-wrap ga-3"
      >
        <PokemonCard :pokemon="pokemon" />
      </v-col>
    </v-row>
    <div v-else>Cargando Pokémon...</div>
  </v-container>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getPokemons, getPokemon } from '../api/pokemonServices'
import PokemonCard from '../components/PokemonCard.vue'

// Definimos la interfaz de un Pokémon
export interface Pokemon {
  name: string
  url: string
  image?: string // La imagen es opcional
  types?: string[] // Los tipos son opcionales
}

// Lista reactiva de Pokémon
const pokemonsList = ref<Pokemon[] | null>(null)

// Función para obtener los datos de los Pokémon
const fetchPokemons = async () => {
  try {
    // Obtener lista básica de Pokémon (nombre y URL)
    const data = await getPokemons()
    const basicPokemons = data.results.map((pokemon: { name: string; url: string }) => ({
      name: pokemon.name,
      url: pokemon.url,
    }))

    // Obtener detalles adicionales de cada Pokémon
    const pokemonDetails = await Promise.all(
      basicPokemons.map(async (pokemon) => {
        const details = await getPokemon(pokemon.name)
        return {
          ...pokemon,
          image: details.sprites?.front_default || '', // Agregamos la imagen
          types: details.types.map((type: { type: { name: string } }) => type.type.name), // Agregamos los tipos
        }
      }),
    )

    // Asignamos los datos completos a la lista reactiva
    pokemonsList.value = pokemonDetails
  } catch (error) {
    console.error('Error al cargar los Pokémon:', error)
    pokemonsList.value = [] // En caso de error, asignamos un array vacío
  }
}

// Llamamos a la función cuando el componente se monta
onMounted(() => {
  fetchPokemons()
})
</script>

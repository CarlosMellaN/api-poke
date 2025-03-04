<template>
  <v-container class="mb-12" no-gutters>
    <v-row align="start" no-gutters v-if="pokemonsList && pokemonsList.length">
      <v-col
        v-for="pokemon in pokemonsList"
        :key="pokemon.name"
        cols="12"
        md="4"
        sm="6"
      >
        <PokemonCard :pokemon="pokemon" />
      </v-col>
    </v-row>
    <div v-else>Cargando Pokémon...</div>
  </v-container>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getAllPokemons, getPokemon } from "../api/pokemonServices";
import PokemonCard from "../components/PokemonCard.vue";
import { mapPokemonDetails } from "@/utils/pokemonBasics";
import type { Pokemon } from "@/types/pokemonTypes";

// Lista reactiva de Pokémon
const pokemonsList = ref<Pokemon[] | null>(null);

// Función para obtener los datos de los Pokémon
const fetchPokemons = async () => {
  try {
    // Obtener lista básica de Pokémon (nombre y URL)
    const data = await getAllPokemons();
    const basicPokemons = data.results.map(
      (pokemon: { name: string; url: string }) => ({
        name: pokemon.name,
        url: pokemon.url,
      })
    );
    const pokemonDetails = await Promise.all(
      basicPokemons.map(async (pokemon: { name: string; url: string }) => {
        const details = await getPokemon(pokemon.name);
        return mapPokemonDetails(details);
      })
    );
    pokemonsList.value = pokemonDetails;
  } catch (error) {
    console.error("Error al cargar los Pokémon:", error);
    pokemonsList.value = []; // En caso de error, asignamos un array vacío
  }
};

// Llamamos a la función cuando el componente se monta
onMounted(() => {
  fetchPokemons();
});
</script>

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
      <v-col cols="12" class="d-flex justify-center">
        <v-pagination
          v-model="page"
          :length="totalPages"
          class="my-4"
          @update:model-value="handlePageChange"
        ></v-pagination>
      </v-col>
    </v-row>
    <div v-else>Cargando Pokémon...</div>
  </v-container>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { getAllPokemons, getPokemon } from "../api/pokemonServices";
import PokemonCard from "../components/PokemonCard.vue";
import { mapPokemonDetails } from "@/utils/pokemonBasics";
import type { Pokemon } from "@/types/pokemonTypes";

// Lista reactiva de Pokémon
const pokemonsList = ref<Pokemon[] | null>(null);
const page = ref(1);
const totalPages = ref(15); // Puedes ajustar este valor según la cantidad total de Pokémon
const limit = ref(99); // Cantidad de Pokémon por página
const isLoading = ref(false);
const totalCount = ref(0);

const getOffset = (pageNum: number): number => {
  return (pageNum - 1) * limit.value;
};

// Función para obtener los datos de los Pokémon
const loadPokemons = async (pageNum: number) => {
  try {
    isLoading.value = true;
    pokemonsList.value = null; // Reiniciar la lista mientras carga

    const offset = getOffset(pageNum);
    const data = await getAllPokemons(limit.value, offset);

    if (data.count !== totalCount.value) {
      totalCount.value = data.count;
      totalPages.value = Math.ceil(data.count / limit.value);
    }

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
    pokemonsList.value = [];
  }
};

// Manejar el cambio de página
const handlePageChange = (newPage: number) => {
  if (newPage !== page.value) {
    loadPokemons(newPage);
  }
};

watch(
  page,
  (newPage) => {
    loadPokemons(newPage);
  },
  { immediate: false }
);

onMounted(() => {
  loadPokemons(page.value);
});
</script>

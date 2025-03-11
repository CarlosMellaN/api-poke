<template>
  <v-dialog
    :model-value="showDialog"
    @update:modelValue="$emit('update:showDialog', $event)"
    max-width="600"
  >
    <v-card>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="$emit('update:showDialog', false)"
          >X</v-btn
        >
      </v-card-actions>
      <v-card-text>
        <v-row>
          <v-col :cols="shouldCenterImage ? 12 : 6" class="text-center">
            <v-img
              :src="props.pokemon.imageFront"
              max-height="200px"
              :class="shouldCenterImage ? 'mx-auto' : ''"
            ></v-img>
          </v-col>
          <v-col v-if="!shouldCenterImage" cols="6">
            <v-img :src="props.pokemon.imageBack" max-height="200px"></v-img>
          </v-col>
        </v-row>
        <v-card-title class="font-weight-bold grey-darken-4">
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
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-icon
            :icon="mdiHeart"
            :color="isFavorite ? 'red' : 'grey'"
            @click="toggleFavorite"
          ></v-icon>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { useFavoritePokemonStore } from "@/stores/pokemonStore";
import { computed } from "vue";
import { mdiHeart } from "@mdi/js";
const props = defineProps<{
  showDialog: boolean;
  pokemon: {
    name: string;
    url: string;
    imageFront: string;
    imageBack: string;
    height: number;
    weight: number;
    types: { name: string }[];
  };
}>();
defineEmits<{
  (e: "update:showDialog", value: boolean): void;
}>();

const favoritePokemonStore = useFavoritePokemonStore();

// Computed para determinar si es favorito
const isFavorite = computed(() =>
  favoritePokemonStore.isFavoritePokemon(props.pokemon.name)
);

// Función para alternar estado de favorito
const toggleFavorite = () => {
  if (isFavorite.value) {
    favoritePokemonStore.removeFavoritePokemon(props.pokemon.name);
  } else {
    favoritePokemonStore.addFavoritePokemon(props.pokemon);
  }
};

const shouldCenterImage = computed(() => {
  return !props.pokemon.imageBack;
});
</script>

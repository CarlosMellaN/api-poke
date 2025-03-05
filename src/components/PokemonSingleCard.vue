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
          <v-col cols="6"
            ><v-img :src="pokemon.imageFront" max-height="200px"></v-img
          ></v-col>
          <v-col cols="6"
            ><v-img :src="pokemon.imageBack" max-height="200px"></v-img
          ></v-col>
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
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

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

// const hover = ref(false);
const emit = defineEmits<{
  (e: "update:showDialog", value: boolean): void;
}>();
</script>

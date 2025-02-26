<template>
  <v-app-bar :elevation="2" rounded class="mb-9">
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>Pokemons</v-app-bar-title>
    <template v-slot:append>
      <v-btn :icon="mdiHeart"></v-btn>
      <v-btn :icon="mdiMagnify"></v-btn>
      <v-btn :icon="mdiDotsVertical"></v-btn>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { mdiMagnify, mdiHeart, mdiDotsVertical } from "@mdi/js";
</script>

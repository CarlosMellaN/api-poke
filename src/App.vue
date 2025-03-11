<script setup lang="ts">
import PokemonsView from "./views/PokemonsView.vue";
import AppBar from "./components/AppBar.vue";
</script>

<template>
  <v-app>
    <v-container>
      <AppBar />
      <PokemonsView />
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import AppBar from "./components/AppBar.vue";
</script>

<template>
  <v-app>
    <v-container>
      <AppBar />
      <router-view />
    </v-container>
  </v-app>
</template>

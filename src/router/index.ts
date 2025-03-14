import { createRouter, createWebHistory } from "vue-router";
import PokemonsView from "../views/PokemonsView.vue";
// import PokemonsFavoritesView from "../views/PokemonsFavoritesView.vue"; // Ensure this file exists at the specified path

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "pokemon",
      component: PokemonsView,
    },
    {
      path: "/favorites",
      name: "favoritesPokemons",
      component: () => import("../views/PokemonsFavoritesView.vue"),
    },
    // {
    //   path: '/pokemon/',
    //   name: 'pokemon',
    //   component: PokemonsView,
    // },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;

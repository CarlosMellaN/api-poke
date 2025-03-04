export interface Pokemon {
  name: string;
  url: string;
  imageFront: string;
  imageBack: string;
  types: { name: string }[]; // Cambiado de PokemonTypes[] a este formato
  height: number;
  weight: number;
}

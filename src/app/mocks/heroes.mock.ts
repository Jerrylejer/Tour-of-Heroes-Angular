// J'importe mon interface "hero"
import { Hero } from '../interfaces/hero';
// J'export ma constante "HEROES"
// HEROES est de type tableau de mon interface "Hero"
// HEROES est égale à un tableau d'objet
// => différents héros aux valeurs de propriétés différentes
export const HEROES: Hero[] = [
  { id: 12, name: 'Dr. Nice' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr. IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' },
];

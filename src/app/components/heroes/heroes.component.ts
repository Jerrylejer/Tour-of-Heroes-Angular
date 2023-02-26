import { Component } from '@angular/core';
import { Hero } from 'src/app/interfaces/hero';
import { HEROES } from 'src/app/mocks/heroes.mock';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent {
  //? AVANT (avant la création et l'import de l'interface) => Add a hero property to HeroesComponent
  // hero: string  = "Windstorm";
  //? AVANT (après l'import et la création de l'interface) => Je type la propriété avec l'interface
  // Ma propriété "hero": de type (interface) "Hero" est égale à l'objet {}
  // hero: Hero = {
  //   id: 1,
  //   name: 'Windstorm',
  // };
  //* MAINTENANT (Utilisation d'un mock => le mock est calqué sur la structure de l'interface) 
  // Je range dans une propriété heroes le contenu data de mon heroes.mock.ts
  // La propriété "heroes" est de type [tableau] 
  // Elle copie la structure de mon interface "Hero" 
  // Elle est égale à ma constante HEROES et en reflète les datas
  heroes: Hero[] = HEROES;
  // Création d'une propriété container qui contiendra le héro cliqué
  // Elle est de type Hero (interface)
  selectedHero?: Hero;
  // Méthodes
  onSelect(hero: Hero): void {
    // Le param récupère le héro cliqué grâce à (click)
    // Je range cette data dans ma props container
    this.selectedHero = hero;
  }
}

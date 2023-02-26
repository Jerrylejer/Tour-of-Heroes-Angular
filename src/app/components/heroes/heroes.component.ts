import { Component } from '@angular/core';
import { Hero } from 'src/app/interfaces/hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent {
  // (avant la création et l'import de l'interface) => Add a hero property to HeroesComponent
  // hero: string  = "Windstorm";

  // (après l'import et la création de l'interface) => Je type la propriété avec l'interface
  // Ma propriété "hero": de type (interface) "Hero" est égale à l'objet {}
  hero: Hero = {
    id: 1,
    name: 'Windstorm',
  };
}

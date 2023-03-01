import { Component } from '@angular/core';
import { Hero } from 'src/app/interfaces/hero';
// Dès le service créé, nous n'vons plus besoin du mock directement (service)
// import { HEROES } from 'src/app/mocks/heroes.mock';
import { HeroService } from 'src/app/service/hero.service';
// Import du service messageService
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent {
  // Injection des services
  constructor(private heroService: HeroService,
    private messageService: MessageService) {}

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
  // heroes: Hero[] = HEROES;
  //* MAINTENANT Dès l'import du service, on redéfini la props heroes
  heroes: Hero[] = [];
  // Création d'une propriété container qui contiendra le héro cliqué
  // Elle est de type Hero (interface)
  selectedHero?: Hero;

  // Méthodes
  ngOnInit() {
    // Au lancement du component, la méthode s'éxecute
    this.getHeroes();
  }
  // Récupérer La data au clic
  onSelect(hero: Hero): void {
    // Le param récupère le héro cliqué grâce à (click)
    // Je range cette data dans ma props container
    this.selectedHero = hero;
    // J'inclue un message lors de la sélection spécifique d'un héros
    this.messageService.addMessage(`HeroesComponent: Selected hero id=${hero.id}`)
  }
  // Récupérer les héros grâce au service
  getHeroes(): void {
    //? AVANT J'envoie dans ma props heroes[] la liste des héros retournée par la méthode getHeroes() du service
    // this.heroes = this.heroService.getHeroes();
    //* MAINTENANT J'adapte à la méthode asynchrone liée à l'observable implémanté dans le service
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }
}

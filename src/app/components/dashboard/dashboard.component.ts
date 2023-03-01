import { Component } from '@angular/core';
import { Hero } from 'src/app/interfaces/hero';
// import du heroService
import { HeroService } from 'src/app/service/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private heroService: HeroService) {}
  // Création de la propriété "heroes" de type tableau de Hero 
  // => elle reçoit la liste renvoyée par getHeroes()
  heroes: Hero[] = [];
  // Méthodes
  ngOnInit(): void {
    this.getHeroes();
  }
  // Utilisation du HeroService pour accéder à la méthode getHeroes() et son Observable
  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes.slice(1, 5))
  }
}

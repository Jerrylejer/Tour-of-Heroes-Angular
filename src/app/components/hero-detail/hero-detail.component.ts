import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from 'src/app/interfaces/hero';
import { HeroService } from 'src/app/service/hero.service';
// Import des services ActivatedRoute, Location, HeroService

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit{
  // Avec @input(), je recois du parent les datas liées à celui-ci (et modifiées s'il y a lieux)
  // @Input() hero?: Hero;
  hero: Hero | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}
  // Les méthodes
  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    // J'enferme le paramètre de la route dans ma constante id
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // Je passe la constante id en paramètre de la méthode gethero() du HeroService
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }
}

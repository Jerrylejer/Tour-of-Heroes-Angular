import { Component, Input } from '@angular/core';
import { Hero } from 'src/app/interfaces/hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {
  // Avec @input(), je recois du parent les datas liées à celui-ci (et modifiées s'il y a lieux)
@Input() hero?: Hero;
}

import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../../interfaces/hero';
import { HeroService } from '../../service/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  // Poussez le terme de recherche dans le flux observable
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // attendre 300ms après chaque frappe avant de considérer le terme debounceTime(300),
      debounceTime(300),
      // ignorer le nouveau terme s'il est identique au terme précédent
      distinctUntilChanged(),
      // passer à une nouvelle recherche observable à chaque fois que le terme change
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}

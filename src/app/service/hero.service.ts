import { Injectable } from '@angular/core';
// import Observable & of from RxJS => Synchronous to asynchronous
import { Observable, of } from 'rxjs';
// Imports de l'interface + du mock (le service en a forcément besoin pour trnasmettre les datas)
import { Hero } from '../interfaces/hero';
import { HEROES } from '../mocks/heroes.mock';
// Import du messageService
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    // Intégration du messageService pour renvoyer un message lorsque la liste est chargée
    this.messageService.addMessage('HeroService: fectched heroes')
    // GetHeroes retourne les datas contenues dans HEROES (typé dans ce but; ni void, ni any)
    return heroes;
  }
}

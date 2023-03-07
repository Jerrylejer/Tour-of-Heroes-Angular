import { Injectable } from '@angular/core';
// import Observable & of from RxJS => Synchronous to asynchronous
import { Observable, of } from 'rxjs';
// import des opérateurs RxJS (data from a server)
import { catchError, map, tap } from 'rxjs';
// import de HttpClient et HttpHeaders (data from a server)
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Imports de l'interface + du mock (le service en a forcément besoin pour trnasmettre les datas)
import { Hero } from '../interfaces/hero';
import { HEROES } from '../mocks/heroes.mock';
// Import des services
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}
  // URL de la web api
  private heroesUrl = 'api/heroes';
  // httpOptions
  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  };

  //todo Retourne la liste des héros
  getHeroes(): Observable<Hero[]> {
    //? AVANT const heroes = of(HEROES);
    // Intégration du messageService pour renvoyer un message lorsque la liste est chargée
    this.messageService.addMessage('HeroService: fectched heroes');
    // GetHeroes retourne les datas contenues dans HEROES (typé dans ce but; ni void, ni any)
    //? AVANT return heroes;
    //* MAINTENANT GET heroes from the server
    return this.http
      .get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', [])));
  }

  //todo Retourne un héros par son ID
  getHero(id: number): Observable<Hero> {
    //? AVANT const hero = HEROES.find((h) => h.id === id)!;
    //* MAINTENANT GET hero by id. Will 404 if id not found
    const url = `${this.heroesUrl}/${id}`;
    // Intégration du messageService pour renvoyer un message lorsque le héros est chargé
    this.messageService.addMessage(`HeroService: fectched hero id=${id}`);
    //? AVANT return of(hero);
    //* MAINTENANT On exploite l'url
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  //todo Puisque l'application l'appelle fréquemment, encapsulez messageService dans une méthode privée log()
  private log(message: string) {
    this.messageService.addMessage(`HeroService: ${message}`);
  }

  //todo Gestion des erreurs via le protocole http
  private handleError<T>(operation = 'operation', result?: T) {
    // operation - name of the operation that failed
    // result - optional value to return as the observable result
    return (error: any): Observable<T> => {
      // log to console instead
      console.error(error); 
      // Error massage delivered by messageService
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  //todo fait l'update du héro sélectionné dans la bdd et le rend persistant => PUT pour l'update
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  //todo créé une nouvelle entrée dans la bdd et la rend persistante => POST pour l'ajout
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    )
  };

  //todo supprime une entrée héro dans la bdd et la rend persistante => DELETE pour la suppression
  deleteHero(id: number): Observable<Hero> {
    // Le méthode delete du composant renseigne en param l'id du héro cliqué, id qui nous
    // sert à cpmlété notre constante url
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    )
  }

  //todo renvoi la valeur du héro recherché dans l'input
  searchHeroes(term: string): Observable<Hero[]> {
    // Si les termes rentrés ne matchent pas
    if(!term.trim()) {
      // On retourne un array vide
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) : 
        this.log(`No heroes found matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHero', []))
    )
  }
}

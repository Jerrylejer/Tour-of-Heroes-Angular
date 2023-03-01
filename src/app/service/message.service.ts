import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  // Je crée une nouvelle propriété "message", de type [de string] et qui est vide
  messages: string[] = [];
  // Méthodes
  // Une méthode qui envoie les messages dans le tableau
  addMessage(message: string) {
    this.messages.push(message);
  };
  // Une méthode qui réinitialise le tableau, une fois me message pushé
  clearMessages() {
    this.messages = [];
  }
}

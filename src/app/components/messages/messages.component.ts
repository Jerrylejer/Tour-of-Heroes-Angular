import { Component } from '@angular/core';
// Import du service messageService
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {

  constructor(public messageService: MessageService) {}
}

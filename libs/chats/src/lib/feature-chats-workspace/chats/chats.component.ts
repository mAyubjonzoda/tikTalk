import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatListComponent } from '../chat-list/chat-list.component';
import { ChatsService } from '@tt/data-access';

@Component({
  selector: 'app-chats',
  imports: [RouterOutlet, ChatListComponent],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss',
})
export class ChatsComponent implements OnInit {
  chatService = inject(ChatsService);
  ngOnInit() {
    this.chatService.connectWS();
  }
}

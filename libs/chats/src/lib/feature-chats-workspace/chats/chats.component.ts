import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatListComponent } from '../chat-list/chat-list.component';
import { ChatsService } from '@tt/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-chats',
  imports: [RouterOutlet, ChatListComponent],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss',
})
export class ChatsComponent {
  chatService = inject(ChatsService);
  constructor() {
    this.chatService.connectWS().pipe(takeUntilDestroyed()).subscribe();
  }
}

import { Component, input } from '@angular/core';
import { AvatarCircleComponent } from '@tt/common-ui';
import { LastMessageRes } from '@tt/interfaces/chats';

@Component({
  selector: 'button[chats]',
  imports: [AvatarCircleComponent],
  templateUrl: './chat-btn.component.html',
  styleUrl: './chat-btn.component.scss',
})
export class ChatBtnComponent {
  chat = input<LastMessageRes>();
}

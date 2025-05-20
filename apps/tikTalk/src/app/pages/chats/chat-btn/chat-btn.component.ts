import { Component, input } from '@angular/core';
import { AvatarCircleComponent } from '../../../common-ui/avatar-circle/avatar-circle.component';
import { LastMessageRes } from '../../../data/interfaces/chats.interface';

@Component({
  selector: 'button[chats]',
  imports: [AvatarCircleComponent],
  templateUrl: './chat-btn.component.html',
  styleUrl: './chat-btn.component.scss',
})
export class ChatBtnComponent {
  chat = input<LastMessageRes>();
}

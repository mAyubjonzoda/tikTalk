import { Component, HostBinding, input } from '@angular/core';

import { AvatarCircleComponent } from '@tt/common-ui';
import { DatePipe } from '@angular/common';
import { Message } from '@tt/interfaces/chats';

@Component({
  selector: 'app-chat-workspace-message',
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './chat-workspace-message.component.html',
  styleUrl: './chat-workspace-message.component.scss',
})
export class ChatWorkspaceMessageComponent {
  message = input.required<Message>();

  @HostBinding('class.mine')
  get isMine() {
    return this.message().isMine;
  }
}

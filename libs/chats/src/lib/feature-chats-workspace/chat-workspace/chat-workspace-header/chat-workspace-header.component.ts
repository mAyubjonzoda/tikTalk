import { Component, input } from '@angular/core';
import { Profile } from '@tt/interfaces/profile';
import { AvatarCircleComponent } from '@tt/common-ui';

@Component({
  selector: 'app-chat-workspace-header',
  imports: [AvatarCircleComponent],
  templateUrl: './chat-workspace-header.component.html',
  styleUrl: './chat-workspace-header.component.scss',
})
export class ChatWorkspaceHeaderComponent {
  profile = input.required<Profile>();
}

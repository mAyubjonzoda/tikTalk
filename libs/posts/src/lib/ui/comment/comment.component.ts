import { Component, input } from '@angular/core';
import { Comment } from '@tt/interfaces/post';
import { AvatarCircleComponent } from '@tt/common-ui';

@Component({
  selector: 'app-comment',
  imports: [AvatarCircleComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  comment = input<Comment>();
}

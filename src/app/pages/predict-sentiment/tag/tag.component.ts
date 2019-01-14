import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tag',
  styleUrls: ['./tag.component.scss'],
  templateUrl: './tag.component.html',
})

export class TagComponent {
  @Input() text: string;
  @Input() color: string;
  @Input() closable: boolean;
  
  @Output() onClose = new EventEmitter();
}

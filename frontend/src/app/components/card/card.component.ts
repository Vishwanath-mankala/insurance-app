import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomButtonComponent } from '../custom-button/custom-button.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CustomButtonComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() title!: string;
  @Input() content!: string;
  @Input() premium!: number;
  @Input() term!: number;
  @Input() coverage!: number;

  @Output() onClick_view = new EventEmitter<void>();
  @Output() onClick_buy = new EventEmitter<void>();

  view() {
    this.onClick_view.emit();
  }

  buy() {
    this.onClick_buy.emit();
  }
}

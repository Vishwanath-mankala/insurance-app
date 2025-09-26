import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomButtonComponent } from "../custom-button/custom-button.component";

@Component({
  selector: 'app-card',
  imports: [CustomButtonComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() title: String = '';
  @Input() content: String = '';
  @Input() footer: String = '';
  @Input() imageUrl: String = '';
  @Input() premium: String = '';
  @Input() term: String = '';
  @Input() coverage: String = '';

  @Output() view = new EventEmitter<void>();
  @Output() buy = new EventEmitter<void>();

  onClick_view() {
    this.view.emit();
  }
  
  onClick_buy() {
    this.buy.emit();
  }
}

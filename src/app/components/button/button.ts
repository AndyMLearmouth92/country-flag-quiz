import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  content = input.required<string>();
  isButtonDisabled = input<boolean>();
  width = input<string>('w-40')
  buttonClicked = output();

  onClicked() {
    this.buttonClicked.emit();
  }
}

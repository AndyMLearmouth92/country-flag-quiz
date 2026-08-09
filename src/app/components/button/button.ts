import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  submittedGuess = output();
  isButtonDisabled = input();

  onSubmitted() {
    this.submittedGuess.emit();
  }
}

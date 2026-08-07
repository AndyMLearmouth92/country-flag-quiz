import { Component, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  submittedGuess = output();

  onSubmitted() {
    this.submittedGuess.emit();
  }
}

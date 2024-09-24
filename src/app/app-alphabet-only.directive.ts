import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAppAlphabetOnly]',
  standalone: true
})
export class AppAlphabetOnlyDirective {

  @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent) {
    const pattern = /^[a-zA-Z]*$/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}

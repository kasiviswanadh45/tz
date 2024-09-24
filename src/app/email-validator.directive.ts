import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appEmailValidator]',
  standalone: true
})
export class EmailValidatorDirective {

  constructor(private el: ElementRef) {}

  @HostListener('blur') onBlur() {
    const email = this.el.nativeElement.value;
    const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (!pattern.test(email)) {
      this.el.nativeElement.classList.add('invalid-email');
    } else {
      this.el.nativeElement.classList.remove('invalid-email');
    }
  }

}

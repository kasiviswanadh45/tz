import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPasswordValidator]',
  standalone: true
})
export class PasswordValidatorDirective {

  constructor(private el: ElementRef) {}

  @HostListener('blur') onBlur() {
    const password = this.el.nativeElement.value;
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!pattern.test(password)) {
      this.el.nativeElement.classList.add('invalid-password');
    } else {
      this.el.nativeElement.classList.remove('invalid-password');
    }
  }

}

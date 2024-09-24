import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatRadioModule, 
 MatDialogModule,
 MatSelectModule
  ],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent implements OnInit {
  signupForm!: FormGroup;
  passwordsMatchError: boolean = false;
  hidePassword: boolean = true;

  constructor(private fb: FormBuilder, private router: Router,
    private authService: AuthService, private dialog: MatDialog) { }

    ngOnInit(): void {
      this.signupForm = this.fb.group({
        firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
        lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
        email: ['', [Validators.required, Validators.email]],
        mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        password: [
          '',
          [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')]
        ],
        confirmPassword: ['', Validators.required]
      }, { validator: this.checkPasswords });
    }

  // Custom validator to check if password and confirm password match
  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notSame: true };
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.passwordsMatchError = true;
      return;
    }
  
    this.authService.register(this.signupForm.value).subscribe({
      next: (response: any) => {
        console.log('User registered successfully:', response);
        this.openLoginDialog(); // Open login dialog after successful registration
      },
      error: (error: any) => {
        console.error('Error during registration:', error);
      }
    });
  }

  openSuccessDialog(): void {
    this.dialog.open(SuccessDialogComponent, {
      width: '400px'
    });
  }

  openLoginDialog(): void {
    this.dialog.open(LoginComponent, {
      width: '400px'
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}

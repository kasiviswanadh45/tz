import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ForgotPasswordService } from '../forgot-password.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,   // Add MatFormFieldModule
    MatInputModule,       // Add MatInputModule
    MatButtonModule, 
    FormsModule,
    MatDialogModule,     // Add MatButtonModule for buttons
    MatIconModule  
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';

  constructor(
    private forgotPasswordService: ForgotPasswordService,
    private dialogRef: MatDialogRef<ForgotPasswordComponent>
  ) {}

  onSubmit() {
    if (!this.email) {
      this.message = 'Please enter a valid email address';
      return;
    }

    this.forgotPasswordService.sendResetLink(this.email).subscribe({
      next: (response) => {
        this.message = 'Password reset link has been sent to your email.';
      },
      error: (error) => {
        this.message = 'Failed to send reset link. Please try again.';
      }
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

import { Component } from '@angular/core';
import { ResetPasswordService } from '../reset-password.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,   // Add MatFormFieldModule
    MatInputModule,       // Add MatInputModule
    MatButtonModule, 
    FormsModule, 
    MatDialogModule,    // Add MatButtonModule for buttons
    MatIconModule  
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';

  constructor(
    private resetPasswordService: ResetPasswordService,
    private dialogRef: MatDialogRef<ResetPasswordComponent>,
    private route: ActivatedRoute
  ) {}

  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      this.message = 'Passwords do not match!';
      return;
    }

    const token = this.route.snapshot.queryParamMap.get('token') || '';
    this.resetPasswordService.resetPassword(token, this.newPassword).subscribe({
      next: (response) => {
        this.message = 'Password has been reset successfully!';
      },
      error: (error) => {
        this.message = 'Failed to reset password. Please try again.';
      }
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

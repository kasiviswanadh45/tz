import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule, 
    MatRadioModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword: boolean = true; // Toggle for password visibility
  loginError: string | null = null; // Track login errors

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {}

  ngOnInit(): void {
    this.buildLoginForm();
  }

  buildLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Email validation
      password: ['', [Validators.required, Validators.minLength(6)]],  // Password validation
      isAdmin: [false]  // This field determines if the user is logging in as admin or not
    });
  }

  // Handle form submission
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginError = 'Please provide valid email and password.';
      return;
    }
  
    const loginData = this.loginForm.value;
    const isAdmin = loginData.isAdmin;  // Check if the user is logging in as admin
  
    // Ensure the API endpoint is correctly chosen based on the isAdmin flag
    this.authService.login({ email: loginData.email, password: loginData.password }, isAdmin).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);
        localStorage.setItem('token', response.token);  // Store JWT token
  
        const decodedToken: any = this.decodeJWT(response.token);
        const userRoles = decodedToken.roles || decodedToken.role;  // Ensure role field is accessed
  
        // Redirect based on role
        if (userRoles === 'ROLE_ADMIN') {
          this.router.navigate(['/admin']);  // Redirect to admin dashboard
        } else {
          this.router.navigate(['/home']);  // Redirect to home page for regular users
        }
  
        this.dialogRef.close();  // Close the login dialog
      },
      error: (error: any) => {
        console.error('Login failed:', error);
        this.loginError = 'Invalid email or password. Please try again.';
      }
    });
  }
  

  // Function to toggle password visibility
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  // Close the login dialog
  closeDialog(): void {
    this.dialogRef.close();
  }


  openForgotPasswordDialog(): void {
    this.dialog.open(ForgotPasswordComponent, {
      width: '400px'
    });
  }

  // Open Reset Password dialog
  openResetPasswordDialog(): void {
    this.dialog.open(ResetPasswordComponent, {
      width: '400px'
    });
  }

  // Manually decode a JWT token
  private decodeJWT(token: string): any {
    const base64Url = token.split('.')[1];  // Get the payload (2nd part of JWT)
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');  // Replace URL-safe characters
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);  // Parse the decoded payload
  }
}

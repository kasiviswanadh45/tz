import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIcon, MatIconModule } from '@angular/material/icon'; 
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { UserProfileDTO } from '../Models/UserProfileDTO';
import { UserService } from '../services/user.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
   ReactiveFormsModule,
    MatIcon,
    MatButtonModule,
    MatIconModule,
     MatCardModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatProgressSpinnerModule
   
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  // Navigation functions
  userProfile: UserProfileDTO | null = null;
  loading = true;  // Flag to indicate loading state
  errorMessage: string | null = null; 
  showProfile: boolean = true;
  imagePreview: string | null = null;
  selectedImage: File | null = null;
  

  constructor(private userService: UserService,
    private authService: AuthService,private router: Router, ) {}

    ngOnInit(): void {
      this.loadUserProfile();
    }
  
    loadUserProfile(): void {
      this.userService.getUserProfileByToken().subscribe(
        (profile) => {
          this.userProfile = profile;
          this.loading = false;
        },
        (error) => {
          this.errorMessage = 'Error fetching user profile. Please try again later.';
          console.error('Error fetching user profile:', error);
          this.loading = false;
        }
      );
    }
  // Save profile data (if you want to make the profile editable)
  onImageSelected(event: any): void {
    const file = event.target.files[0];
    this.selectedImage = file;

    // Preview the selected image
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  saveProfile(): void {
    const formData = new FormData();

    // Append profile fields to FormData
    formData.append('email', this.userProfile?.email || '');
    formData.append('mobileNumber', this.userProfile?.mobileNumber || '');
    formData.append('location', this.userProfile?.location || '');
    formData.append('preferredLanguage', this.userProfile?.preferredLanguage || '');

    // Append the image file if selected
    if (this.selectedImage) {
      formData.append('profilePicture', this.selectedImage);
    }

    this.userService.updateUserProfile(formData).subscribe(
      (response) => {
        console.log('Profile updated successfully');
      },
      (error) => {
        console.error('Error updating profile', error);
      }
    );
  }
  closeProfile(): void {
    console.log('Close button clicked');  // Add a log to check if the button is working
    this.showProfile = false;  // This should hide the profile form
  }

  triggerFileInput() {
    const fileInput = document.getElementById('profilePictureInput') as HTMLInputElement;
    fileInput.click();
  }

  logout(): void {
    this.authService.logout(); // Logout the user
    this.router.navigate(['/login']);
  }
}

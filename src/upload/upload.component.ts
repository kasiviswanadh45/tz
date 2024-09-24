import { Component } from '@angular/core';
import { FileUploadService } from '../app/services/file-upload.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'], // Fixed typo here (it should be 'styleUrls' not 'styleUrl')
})
export class UploadComponent {
  selectedFile: File | null = null;
  uploadStatus: string = '';
  processStatus: string = '';
  uploadProgress: number = 0; // Progress percentage
  isUploading: boolean = false;
  isProcessing: boolean = false;
  fileName: string = '';

  constructor(private FileUploadService: FileUploadService,private dialogRef: MatDialogRef<UploadComponent>) {} // Inject the service

  // Handle the file selection event
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.uploadStatus = ''; // Reset status when a new file is selected
      this.uploadProgress = 0; // Reset progress bar
    }
  }

  // Method to upload the selected Excel file to TempData using the service
  onSubmit() {
    if (!this.selectedFile) {
      this.uploadStatus = 'Please select a file.';
      return; // Early exit if no file is selected
    }
  
    this.isUploading = true; // Show progress bar
  
    this.FileUploadService.uploadFile(this.selectedFile)
      .subscribe({
        next: (event: HttpEvent<any>) => {
          try {
            if (event.type === HttpEventType.UploadProgress) {
              if (event.total) {
                this.uploadProgress = Math.round((100 * event.loaded) / event.total);
              }
            } else if (event.type === HttpEventType.Response) {
              if ((event.status === 200 || event.status === 201)) {
                // Log success and update status
                this.uploadStatus = 'File uploaded successfully!';
                this.isUploading = false; // Hide progress bar
              } else {
                this.handleUnexpectedStatus(event.status);  // Call method to handle unexpected status
              }
            }
          } catch (error) {
            console.error('Error in next handler:', error);
            this.isUploading = false; // Hide progress bar if error occurs
            this.uploadStatus = 'An error occurred while uploading the file. Please try again.';
          }
        },
        error: (error) => {
          try {
            this.isUploading = false; 
            {error}// Hide progress bar
            // this.uploadStatus = 'Failed to upload file. Please try again.';
          } catch (err) {
            console.error('Error in error handler:', err);
            this.uploadStatus = 'An unknown error occurred. Please contact support.';
          }
        },
        complete: () => {
          // Optional: Actions when the upload completes
          console.log('Upload process completed');
        },
      });
  }
  
  
  handleUnexpectedStatus(statusCode: number) {
    if (statusCode === 403) {
      this.uploadStatus = 'Error uploading file: Access denied.';
    } else {
      this.uploadStatus = `File uploaded, but server returned an unexpected status code: ${statusCode}`;
    }
  }

  // Method to process the data in TempData using the service
  onProcessData() {
    this.isProcessing = true; // Show processing spinner
    this.FileUploadService.processData().subscribe(
      (response) => {
        this.isProcessing = false; // Hide processing spinner
        this.processStatus = 'TempData processed successfully!';
      },
      (error) => {
        this.isProcessing = false; // Hide processing spinner
        this.processStatus = ' processed successfully!.To main tables';
        console.error('Error processing data:', error);
      }
    );
  }



  closeDialog(): void {
    this.dialogRef.close();
  }
}

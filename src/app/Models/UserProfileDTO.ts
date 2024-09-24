export interface UserProfileDTO {
    userId: string;            // UUID of the user
    firstName: string;         // First name of the user
    lastName: string;          // Last name of the user
    email: string;             // Email address of the user
    mobileNumber: string;        // Phone number of the user
    location: string;          // Location of the user
    preferredLanguage: string; // Preferred language of the user
    profilePicture?: string;   // Optional profile picture URL
  }
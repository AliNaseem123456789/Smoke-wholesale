export interface ProfileUpdateFormData {
  firstName: string;
  lastName: string;
  businessName: string;
  phone: string;
}

export interface UserProfileResponse {
  message: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    businessName: string;
    phone: string;
  };
}

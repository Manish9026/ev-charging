export interface User {
  _id: string;
  name?: string;
  email: string;
  isAdmin: boolean;
  phoneNumber?: string;
  profileImage?: string;
  createdAt?: string;
  favorites?: string[];
  isLoggedIn?:boolean;
}
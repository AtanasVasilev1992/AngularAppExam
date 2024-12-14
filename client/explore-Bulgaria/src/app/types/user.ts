export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    _id: string;
    email: string;
    username: string;
    __v: number;
  }
  
  export interface User {
    _id: string;
    email: string;
    username: string;
    password: string;
    __v: number;
  }
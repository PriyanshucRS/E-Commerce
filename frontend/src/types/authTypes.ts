export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  __v: number;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isRegistered: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  role: 'admin' | 'user' | 'editor';
  birthDate: string;
  bio: string;
  salary: number;
  skills: string[];
  terms: boolean;
  notifications: boolean;
  createdAt: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
  age: number;
  role: 'admin' | 'user' | 'editor';
  birthDate: string;
  bio: string;
  salary: number;
  skills: string[];
  terms: boolean;
  notifications: boolean;
}

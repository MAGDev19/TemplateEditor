import { http, HttpResponse } from 'msw';
import type { User, CreateUserInput } from '@/features/users/types/users.types';

// Datos iniciales de ejemplo pre-cargados
export const INITIAL_MOCK_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@empresa.com',
    age: 29,
    role: 'admin',
    birthDate: '1996-04-15',
    bio: 'Desarrollador Fullstack apasionado por la arquitectura limpia y React 19.',
    salary: 4500,
    skills: ['React', 'TypeScript', 'Node.js'],
    terms: true,
    notifications: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'usr-2',
    name: 'Lucía Fernández',
    email: 'lucia.f@empresa.com',
    age: 34,
    role: 'editor',
    birthDate: '1991-11-22',
    bio: 'Diseñadora de Experiencia de Usuario (UX/UI) especializada en Design Systems.',
    salary: 3800,
    skills: ['Figma', 'UI/UX', 'TailwindCSS'],
    terms: true,
    notifications: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'usr-3',
    name: 'Mateo Restrepo',
    email: 'mateo.r@empresa.com',
    age: 26,
    role: 'user',
    birthDate: '1999-08-05',
    bio: 'Ingeniero de Software enfocado en optimización de rendimiento y pruebas automatizadas.',
    salary: 3200,
    skills: ['Vitest', 'Playwright', 'TypeScript'],
    terms: true,
    notifications: true,
    createdAt: new Date().toISOString(),
  },
];

let mockUsers: User[] = [...INITIAL_MOCK_USERS];

export const handlers = [
  // GET /api/users
  http.get('*/api/users', () => {
    return HttpResponse.json(mockUsers);
  }),

  // POST /api/users
  http.post('*/api/users', async ({ request }) => {
    const input = (await request.json()) as CreateUserInput;
    const newUser: User = {
      id: `usr-${Date.now()}`,
      ...input,
      createdAt: new Date().toISOString(),
    };
    mockUsers.push(newUser);
    return HttpResponse.json(newUser, { status: 201 });
  }),

  // DELETE /api/users/:id
  http.delete('*/api/users/:id', ({ params }) => {
    const { id } = params;
    mockUsers = mockUsers.filter((u) => u.id !== id);
    return HttpResponse.json({ success: true });
  }),
];

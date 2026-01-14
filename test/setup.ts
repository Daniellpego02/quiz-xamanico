import { beforeAll } from 'vitest';

// Mock localStorage
const localStorageMock = {
  getItem: (key: string) => {
    return (global as any).storage[key] || null;
  },
  setItem: (key: string, value: string) => {
    (global as any).storage[key] = value;
  },
  removeItem: (key: string) => {
    delete (global as any).storage[key];
  },
  clear: () => {
    (global as any).storage = {};
  },
};

beforeAll(() => {
  (global as any).storage = {};
  global.localStorage = localStorageMock as any;
});

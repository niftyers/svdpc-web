import { DefaultSession } from 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
    username: string;
    photo?: string;
  }

  interface Session {
    user: DefaultSession['user'] & {
      id: string;
      name: string;
      username: string;
      photo?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    name: string;
    username: string;
    photo?: string;
    sub?: string;
  }
}
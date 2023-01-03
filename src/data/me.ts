import { type Context, createContext, useContext } from 'react';
import { type User } from '../types/User';
import { users } from './createMockData';

export const me = users.at(0)!;

// create react context to store the current user
export const UserContext = createContext<User>(me);

// export hook to use the current user
export function useUser(): User {
  return useContext(UserContext);
}

// create react context to store the current user
export const ProfileUserContext = createContext<User | null>(null);

// export hook to use the current user
export function useProfileUser(): User | null {
  return useContext(ProfileUserContext);
}

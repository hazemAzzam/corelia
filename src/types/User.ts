export type User = {
  id: string;
  email: string;
  name?: string;
  password?: string;
};

export type UserWithRememberMe = User & { rememberMe: boolean };

export type TypeUser = {
  id: number;
  name: string;
  email: string;
  password: string;
};
export type TypeUserWithAccessToken = {
  accessToken: string;
  user: TypeUser;
};

export type TypeUserRegistration = Omit<TypeUser, 'id'>;

export type TypeUserAuthorization = Pick<TypeUser, 'email' | 'password'>;

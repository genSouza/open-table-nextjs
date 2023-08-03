export interface IAuthModalInput {
  inputs: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    password: string;
  };
  handleChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isSignIn: boolean;
}

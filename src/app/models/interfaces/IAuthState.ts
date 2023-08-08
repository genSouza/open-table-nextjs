import { IUser } from "./IUser";

export interface IState {
  loading: boolean;
  data: IUser | null;
  error: string | null;
}

export interface IAuthState extends IState {
  setAuthState: React.Dispatch<React.SetStateAction<IState>>;
}

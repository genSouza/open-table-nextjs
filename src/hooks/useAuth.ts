import axios from "axios";

const useAuth = () => {
  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        { email, password }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  const signOut = async () => {};

  return { signIn, signOut };
};

export default useAuth;

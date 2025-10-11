import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
export default function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ fullname, email, password }) =>
      signupApi({
        fullname,
        email,
        password,
      }),
    onSuccess: (data) => {
      // Supabase returns a 'user' object only if signup succeeded
      if (data?.user) {
        toast.success(
          " Account created! Please confirm your email address to continue."
        );
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
    onError: (err) => {
      if (
        err.message?.includes(
          "User already registered or email already exists."
        )
      ) {
        toast.error(
          "This email address is already in use. Please use another one."
        );
      } else {
        toast.error(err.message || "Signup failed. Please try again.");
      }
    },
  });
  return { signup, isLoading };
}

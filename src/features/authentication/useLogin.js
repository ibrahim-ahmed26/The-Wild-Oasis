import { useMutation, useQueryClient } from "@tanstack/react-query";
import loginApi from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: Login, isLoading: isLoginingIn } = useMutation({
    mutationFn: ({ email, password }) =>
      loginApi({
        email,
        password,
      }),
    onSuccess: (data) => {
      toast.success(
        `Welcome back, ${data?.user?.email?.split("@")[0] || "there"}! 👋`
      );
      queryClient.setQueryData(["user"], data.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.error(err);
      toast.error(
        err.message || "Login failed. Please check your credentials."
      );
    },
  });
  return { Login, isLoginingIn };
}

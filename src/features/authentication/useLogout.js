import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as loginoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: loginoutApi,
    onSuccess: () => {
      toast.success("User LoggedOut Succesfully");
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });
  return { logout, isLoading };
}

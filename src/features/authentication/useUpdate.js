import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdate() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: ({ fullname, password, avatar }) =>
      updateUserApi({ fullname, password, avatar }),
    onSuccess: ({ user }) => {
      toast.success("User Account Details Changed Succesfully");
      queryClient.setQueryData(["user"], user);
    },
    onError: () => {
      toast.error("Something Went Wrong Please Try Again");
    },
  });
  return { updateUser, isUpdating };
}

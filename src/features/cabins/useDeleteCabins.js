import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useDeleteCabins() {
  const queryClient = useQueryClient();
  const { mutate: deleteCabin, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCabins,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin deleted successfully ✅");
    },
    onError: (err) => {
      toast.error(`${err.message} ❌`);
    },
  });
  return { deleteCabin, isDeleting };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
    mutationFn: ({ id, updatedCabin }) => updateCabins(id, updatedCabin),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabins updated Succesfully ✅");
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });
  return { updateCabin, isUpdating };
}

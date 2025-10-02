import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabins, isLoading: isCreating } = useMutation({
    mutationFn: addCabins,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabins Add Succesfully ✅");
    },
    onError: (err) => {
      toast.error(`${err.message} ❌`);
    },
  });
  return { createCabins, isCreating };
}

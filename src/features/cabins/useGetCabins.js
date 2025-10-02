import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useGetCabins() {
  const { isLoading, data: cabinData } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  return { cabinData, isLoading };
}

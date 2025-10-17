import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
  const queryClient = useQueryClient();
  const { isLoading, data: todayBookings } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["staysToday"],
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });
    },
  });
  return { isLoading, todayBookings };
}

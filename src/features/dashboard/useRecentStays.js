import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export default function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryData = subDays(new Date(), numDays).toISOString();
  const { isLoading, data: recentStays } = useQuery({
    queryFn: () => getStaysAfterDate(queryData),
    queryKey: ["Stays", `last-${numDays}`],
  });
  const confirmedStays = recentStays?.filter(
    (stay) => stay.status === "checked-in"
  );
  return { isLoading, recentStays, confirmedStays };
}

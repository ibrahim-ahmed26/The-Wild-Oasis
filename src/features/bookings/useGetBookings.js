import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constrains";

export function useGetBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // Sort
  const sortByValue = searchParams.get("sort") || "start-date,asc";
  const [field, direction] = sortByValue.split(",");
  const sortBy = { field, direction };

  // Page
  const page = Number(searchParams.get("page")) || 1;

  // Query
  const { data, isLoading } = useQuery({
    queryFn: () => getBookings({ filter, sortBy, page }),
    queryKey: ["bookings", filter, sortBy, page],
  });

  const bookings = data?.data ?? [];
  const count = data?.count ?? 0;

  // Prefetch next/prev pages
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
      queryKey: ["bookings", filter, sortBy, page + 1],
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
      queryKey: ["bookings", filter, sortBy, page - 1],
    });
  }

  return { bookings, isLoading, count };
}

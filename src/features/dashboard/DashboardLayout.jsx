import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import useRecentStays from "./useRecentStays";
import Stats from "./Stats";
import { useGetCabins } from "../cabins/useGetCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
export default function DashboardLayout() {
  const { isLoading, recentBookings, numDays } = useRecentBookings();
  const { isLoading: isLoadingStays, confirmedStays } = useRecentStays();
  const { isLoading: cabinLoading, cabinData } = useGetCabins();
  if (isLoading || isLoadingStays || cabinLoading) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={recentBookings}
        checkedIn={confirmedStays}
        cabinNum={cabinData?.length}
      />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart numDays={numDays} bookings={recentBookings} />
    </StyledDashboardLayout>
  );
}

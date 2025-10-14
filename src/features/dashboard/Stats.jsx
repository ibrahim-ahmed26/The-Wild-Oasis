import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({ bookings, checkedIn, cabinNum }) {
  const numBookingLength = bookings?.length;
  const salesNum = bookings.reduce((acc, curr) => acc + curr["total-price"], 0);
  const checkedInNum = checkedIn?.length;
  const occupanyRate = Math.round((checkedInNum / cabinNum) * 100) || 0;
  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        color="blue"
        title="bookings"
        value={numBookingLength}
      ></Stat>
      <Stat
        icon={<HiOutlineBanknotes />}
        color="green"
        title="Sales"
        value={formatCurrency(salesNum)}
      ></Stat>
      <Stat
        icon={<HiOutlineCalendarDays />}
        color="indigo"
        title="check ins"
        value={checkedInNum}
      ></Stat>
      <Stat
        icon={<HiOutlineChartBar />}
        color="yellow"
        title="occupancy rate"
        value={`${occupanyRate}%`}
      ></Stat>
    </>
  );
}

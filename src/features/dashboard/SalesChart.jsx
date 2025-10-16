import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import Heading from "../../ui/Heading";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

export default function SalesChart({ bookings, numDays }) {
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });
  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(date, booking.created_at))
        .reduce((acc, curr) => acc + curr["total-price"] || 0, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, booking.created_at))
        .reduce((acc, curr) => acc + curr["extras-price"] || 0, 0),
    };
  });
  const { isDarkMode } = useDarkMode();
  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };
  return (
    <StyledSalesChart>
      <Heading as="h3">
        Sales {format(allDates.at(0), "MMM dd")} -{" "}
        {format(allDates.at(-1), "MMM dd")}
      </Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <CartesianGrid strokeDasharray={4} />
          <Area
            type="monotone"
            fill={colors.totalSales.fill}
            stroke={colors.totalSales.stroke}
            dataKey="totalSales"
            name="Total Sales"
            strokeWidth={2}
            unit="$"
          />
          <Area
            type="monotone"
            fill={colors.extrasSales.fill}
            stroke={colors.extrasSales.stroke}
            dataKey="extrasSales"
            name="Extra Sales"
            strokeWidth={2}
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

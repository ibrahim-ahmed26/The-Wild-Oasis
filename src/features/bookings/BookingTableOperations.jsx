import SortBy from "../../ui/SortedList";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { value: "start-date,desc", label: "Sort by date (recent first)" },
          { value: "start-date,asc", label: "Sort by date (earlier first)" },
          {
            value: "total-price,desc",
            label: "Sort by amount (high first)",
          },
          { value: "total-price,asc", label: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;

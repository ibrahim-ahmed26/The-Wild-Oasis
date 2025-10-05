import Filter from "../../ui/Filter";
import SortedList from "../../ui/SortedList";
import TableOperations from "../../ui/TableOperations";

export default function CabinOperations() {
  return (
    <TableOperations>
      <Filter
        filterField={"discount"}
        options={[
          { value: "all", label: "All" },
          { value: "with-discount", label: "With Discount" },
          { value: "no-discount", label: "No Discount" },
        ]}
      ></Filter>
      <SortedList
        options={[
          { value: "name,asc", label: "Sort By Name (a-z)" },
          { value: "name,desc", label: "Sort By Name (z-a)" },
          { value: "regular-price,asc", label: "Sort By Price (low-high)" },
          { value: "regular-price,desc", label: "Sort By Price (high-low)" },
          {
            value: "max-capacity,asc",
            label: "Sort By maxCapacity (low-high)",
          },
          {
            value: "max-capacity,desc",
            label: "Sort By maxCapacity (high-low)",
          },
        ]}
      />
    </TableOperations>
  );
}

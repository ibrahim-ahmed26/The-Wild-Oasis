import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useGetCabins } from "./useGetCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

export default function CabinTable() {
  const { cabinData, isLoading } = useGetCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabinData.length) return <Empty resourceName={"cabins"} />;
  const filterdValue = searchParams.get("discount") || "all";
  let filterdCabins = cabinData;
  if (filterdValue === "with-discount")
    filterdCabins = cabinData.filter((cabin) => cabin.discount > 0);
  if (filterdValue === "no-discount")
    filterdCabins = cabinData.filter((cabin) => cabin.discount === 0);
  const sortedBy = searchParams.get("sort") || "startDate-asc";
  const [field, direction] = sortedBy.split(",");
  const oppositeDirection = direction === "asc" ? 1 : -1;
  const sortedCabins = filterdCabins.sort(
    (a, b) => (a[field] - b[field]) * oppositeDirection
  );
  return (
    <Menus>
      <Table columns="repeat(6, 1fr)">
        <Table.Header role="row" as="header">
          <div>image</div>
          <div>Cabin</div>
          <div>Capcity</div>
          <div>Price</div>
          <div>Discount</div>
          <div>Actions</div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

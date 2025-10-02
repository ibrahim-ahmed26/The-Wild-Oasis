import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useGetCabins } from "./useGetCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

export default function CabinTable() {
  const { cabinData, isLoading } = useGetCabins();
  if (isLoading) return <Spinner />;
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
          data={cabinData}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

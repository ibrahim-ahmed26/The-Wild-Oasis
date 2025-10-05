import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinOperations from "../features/cabins/CabinOperatoins";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h3">All cabins</Heading>
        <CabinOperations></CabinOperations>
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;

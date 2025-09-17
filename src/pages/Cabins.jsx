import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import { useState } from "react";
import BUTTON from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [showCabin, setShowCabin] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h3">All cabins</Heading>
        <p>Filter/Sort</p>
      </Row>
      <Row>
        <CabinTable />
        <BUTTON sizes="large" onClick={() => setShowCabin((show) => !show)}>
          {!showCabin ? "Add Cabin" : "Close Form"}
        </BUTTON>
        {showCabin && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;

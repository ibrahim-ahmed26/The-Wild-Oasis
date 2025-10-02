import BUTTON from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

export default function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open name="add-cabin">
          <BUTTON>Add Cabin</BUTTON>
        </Modal.Open>
        <Modal.Window name="add-cabin">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

import styled, { css } from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabins from "./useDeleteCabins";
import { useCreateCabin } from "./useCreateCabin";
import { HiDocumentDuplicate, HiPencil, HiTrash } from "react-icons/hi";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono", monospace;
`;

const Capacity = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-500);
  font-weight: 500;
`;

const Price = styled.div`
  font-family: "Sono", monospace;
  font-weight: 600;
  font-size: 1.5rem;
  color: var(--color-grey-700);
`;

const Discount = styled.div`
  font-family: "Sono", monospace;
  font-weight: 500;
  font-size: 1.4rem;
  color: ${(props) =>
    props.hasDiscount ? "var(--color-green-700)" : "var(--color-grey-400)"};

  ${(props) =>
    props.hasDiscount &&
    css`
      background-color: var(--color-green-100);
      padding: 0.4rem 0.8rem;
      border-radius: 10%;
      text-align: left;
    `}
`;

const DeleteButton = styled.button`
  ${(props) =>
    props.type === "edit" &&
    css`
      background-color: var(--color-brand-500);
      &:hover {
        background-color: var(--color-brand-800);
        transform: translateY(-1px);
        box-shadow: 0 3px 8px var(--color-brand-800);
      }
    `}
  ${(props) =>
    props.type === "delete" &&
    css`
      background-color: var(--color-red-800);
      &:hover {
        background-color: var(--color-red-800);
        transform: translateY(-1px);
        box-shadow: 0 3px 8px var(--color-red-800);
      }
    `}
    ${(props) =>
    props.type === "duplicate" &&
    css`
      background-color: var(--color-silver-700);
      &:hover {
        background-color: var(--color-silver-100);
        transform: translateY(-1px);
        box-shadow: 0 3px 8px var(--color-silver-100);
      }
    `}
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 3px;
  font-size: 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  justify-self: center;
  white-space: nowrap;
  margin-left: 3px;

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: 2px solid var(--color-red-200);
    outline-offset: 2px;
  }
`;

export default function CabinRow({ cabin }) {
  const {
    id: cabinId,
    name,
    "max-capacity": maxCapacity,
    "regular-price": regularPrice,
    discount,
    image,
    description,
  } = cabin;
  function handleDuplicate() {
    createCabins({
      name: `Copy of ${name}`,
      "max-capacity": maxCapacity,
      "regular-price": regularPrice,
      discount,
      image,
      description,
      isDuplicate: true,
    });
    console.log(image);
  }
  const hasDiscount = discount && discount > 0;
  const { deleteCabin, isDeleting } = useDeleteCabins();
  const { isCreating, createCabins } = useCreateCabin();
  return (
    <Table columns="repeat(6,1fr)">
      <Table.Row>
        <Img src={image} alt={`${name} cabin`} />
        <Cabin>{name}</Cabin>
        <Capacity>Fits up to {maxCapacity} guests</Capacity>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount hasDiscount={hasDiscount}>
          {hasDiscount ? formatCurrency(discount) : "—"}
        </Discount>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabinId} />
              <Menus.List id={cabinId}>
                <Menus.Button
                  onClick={handleDuplicate}
                  disabled={isCreating}
                  icon={<HiDocumentDuplicate />}
                >
                  Duplicate
                </Menus.Button>
                <Modal.Open name="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>
                <Modal.Open name="delete">
                  <Menus.Button
                    icon={<HiTrash />}
                    onClick={() => console.log("Hellows")}
                  >
                    Delete
                  </Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="edit">
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>
              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName="cabins"
                  onConfirm={() => deleteCabin(cabinId)}
                  disabled={isDeleting}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </Table>
  );
}

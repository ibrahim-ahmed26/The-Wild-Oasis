import styled, { css } from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;
  transition: background-color 0.2s ease;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:hover {
    background-color: var(--color-grey-50);
  }
`;

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
  background-color: var(--color-red-700);
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 3px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  justify-self: center;
  white-space: nowrap;

  &:hover {
    background-color: var(--color-red-800);
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(220, 38, 38, 0.3);
  }

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
  } = cabin;

  const hasDiscount = discount && discount > 0;
  const queryClient = useQueryClient();
  const { mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabins,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin deleted successfully ✅");
    },
    onError: (err) => {
      toast.error(`${err.message} ❌`);
    },
  });
  return (
    <TableRow role="row">
      <Img src={image} alt={`${name} cabin`} />
      <Cabin>{name}</Cabin>
      <Capacity>Fits up to {maxCapacity} guests</Capacity>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount hasDiscount={hasDiscount}>
        {hasDiscount ? formatCurrency(discount) : "—"}
      </Discount>
      <DeleteButton type="button" onClick={() => deleteCabin(cabinId)}>
        Delete
      </DeleteButton>
    </TableRow>
  );
}

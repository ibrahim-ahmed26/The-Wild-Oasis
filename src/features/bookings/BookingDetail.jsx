import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import useCheckIn from "../check-in-out/useCheckIn";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useGetBooking } from "./useGetBooking";
import Spinner from "../../ui/Spinner";
import useCheckOut from "../check-in-out/useCheckOut";
import useDeleteBooking from "./useDeleteBooking";
import { useState } from "react";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useGetBooking();
  const [showConfirm, setShowConfirm] = useState(false);
  const moveBack = useMoveBack();
  const { checkIn, isChecking } = useCheckIn();
  const { checkOut, isCheckingOut } = useCheckOut();
  const { deleteSingleBooking, isDeleteing } = useDeleteBooking();
  function handleCheckIn() {
    checkIn({
      bookingId: id,
      extrasPrice: booking["extras-price"],
      totalPrice: booking["total-price"],
      hasBreakfast: booking["has-breakfast"],
    });
  }
  function handleDelete() {}
  function handleCheckOut() {
    checkOut(id);
  }
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  if (isLoading) return <Spinner />;
  const { id, status } = booking;
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            variations="primary"
            onClick={handleCheckIn}
            disabled={isChecking}
          >
            Check In
          </Button>
        )}
        {status === "checked-in" && (
          <Button
            variations="primary"
            onClick={handleCheckOut}
            disabled={isCheckingOut}
          >
            Check Out
          </Button>
        )}
        {(status === "checked-out" || status === "unconfirmed") && (
          <Modal>
            <Modal.Open
              name="Deleting Booking"
              onClose={() => setShowConfirm(false)}
            >
              <Button variations="danger">Delete</Button>
            </Modal.Open>
            <Modal.Window name="Deleting Booking">
              <ConfirmDelete
                resourceName={`Booking #${id}`}
                onConfirm={() => {
                  deleteSingleBooking(id);
                  setShowConfirm(false);
                }}
                disabled={isDeleteing}
                onCloseModal={() => setShowConfirm(false)}
              />
            </Modal.Window>
          </Modal>
        )}

        <Button variations="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;

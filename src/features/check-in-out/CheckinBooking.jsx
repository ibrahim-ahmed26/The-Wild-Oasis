import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useGetBooking } from "../bookings/useGetBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import useCheckIn from "./useCheckIn";
import { useGetSettings } from "../settings/useGetSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { booking, isLoading } = useGetBooking();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakFast, setAddBreakFast] = useState(false);
  const { checkIn, isChecking } = useCheckIn();
  const { settings, isLoading: isUpdatingSettings } = useGetSettings();
  const moveBack = useMoveBack();
  if (isLoading || isUpdatingSettings) return <Spinner />;
  const {
    id: bookingId,
    "num-nights": numNights,
    "num-guests": numGuests,
    "extras-price": extrasPrice,
    "total-price": totalPrice,
    "is-paid": isPaid,
    status,
    guests: { full_name: guestName },
  } = booking;
  const { "breakfast-price": breakfastPrice } = settings;
  const optianalPrice = breakfastPrice * numNights * numGuests;
  function handleCheckin() {
    if (!confirmPaid && !isPaid) return;
    const extras = addBreakFast ? optianalPrice : extrasPrice || 0;
    const newTotal = addBreakFast ? totalPrice + optianalPrice : totalPrice;
    checkIn({
      bookingId,
      extrasPrice: extras,
      totalPrice: newTotal,
      hasBreakfast: addBreakFast,
    });
  }
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!extrasPrice && (
        <Box>
          <Checkbox
            checked={addBreakFast}
            onChange={() => setAddBreakFast((value) => !value)}
          >
            Want To Add Additional BreakFast
          </Checkbox>
        </Box>
      )}
      {!isPaid && (
        <Box>
          <Checkbox
            checked={confirmPaid}
            disabled={confirmPaid}
            onChange={() => setConfirmPaid((confirm) => !confirm)}
          >
            I confirm that <strong>{guestName}</strong> has paid the total
            amount of{" "}
            <strong>
              {addBreakFast
                ? formatCurrency(totalPrice + optianalPrice)
                : formatCurrency(totalPrice)}
            </strong>
            {addBreakFast && (
              <> including breakfast ({formatCurrency(optianalPrice)} extra)</>
            )}
            .
          </Checkbox>
        </Box>
      )}

      {isPaid && (
        <Box>
          <p>
            {guestName} has already paid the base total amount of{" "}
            <strong>{formatCurrency(totalPrice)}</strong>.
          </p>

          {addBreakFast && (
            <>
              <p>
                Additional breakfast charge:{" "}
                <strong>{formatCurrency(optianalPrice)}</strong>
              </p>
              <p>
                <strong>New total:</strong>{" "}
                {formatCurrency(totalPrice + optianalPrice)}
              </p>
            </>
          )}
        </Box>
      )}
      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={handleCheckin} disabled={!confirmPaid && !isPaid}>
            {isChecking ? "Checking in..." : `Check in booking #${bookingId}`}
          </Button>
        )}

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;

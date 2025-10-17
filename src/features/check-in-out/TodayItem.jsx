import styled from "styled-components";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import getFlagUrl from "../../utils/getFlagUrl";
import BUTTON from "../../ui/Button";
import CheckoutButton from "./CheckoutButton";
const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

export default function TodayItem({ activity }) {
  const { id, guests, "num-nights": numNights, status } = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}
      <Flag src={getFlagUrl(guests["country_flag"])} alt="Country flag" />
      <Guest>{guests["full_name"]}</Guest>
      <div>{numNights}</div>
      {status === "unconfirmed" && (
        <BUTTON
          sizes="small"
          variations="primary"
          as="a"
          href={`/bookings/booking/${id}`}
        >
          Check In
        </BUTTON>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

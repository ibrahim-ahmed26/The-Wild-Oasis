import Button from "../../ui/Button";
import useCheckOut from "./useCheckOut";

function CheckoutButton({ bookingId }) {
  const { checkOut, isCheckingOut } = useCheckOut();
  return (
    <Button
      variations="primary"
      sizes="small"
      onClick={() => checkOut(bookingId)}
      disabled={isCheckingOut}
    >
      {isCheckingOut ? "checking out ..." : " check out"}
    </Button>
  );
}

export default CheckoutButton;

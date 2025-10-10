import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function useCheckIn() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checkIn, isLoading: isChecking } = useMutation({
    mutationFn: ({ bookingId, extrasPrice, totalPrice, hasBreakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        "is-paid": true,
        "extras-price": extrasPrice,
        "total-price": totalPrice,
        "has-breakfast": hasBreakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} checked in successfully.`);
      queryClient.invalidateQueries({
        active: true,
      });
      navigate("/");
    },
    onError: () => {
      toast.error("Failed to check in the booking. Please try again.");
    },
  });
  return { checkIn, isChecking };
}

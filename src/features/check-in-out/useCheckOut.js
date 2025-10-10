import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function useCheckOut() {
  const queryClient = useQueryClient();
  const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: "checked-out" }),
    mutationKey: ["bookings"],
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} checked out successfully.`);
      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: () =>
      toast.error("Failed to check in the booking. Please try again."),
  });
  return { isCheckingOut, checkOut };
}

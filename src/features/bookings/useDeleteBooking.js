import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function useDeleteBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: deleteSingleBooking, isLoading: isDeleteing } = useMutation({
    mutationFn: (bookingId) => deleteBooking(bookingId),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} Deleted successfully.`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: (error) => {
      console.error("❌ DELETE ERROR:", error); // 👈 debug line
      toast.error("Failed to Delete the booking. Please try again.");
    },
  });
  return { deleteSingleBooking, isDeleteing };
}

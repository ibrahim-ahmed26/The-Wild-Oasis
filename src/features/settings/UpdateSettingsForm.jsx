import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useGetSettings } from "./useGetSettings";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./useUpdateSetting";
function UpdateSettingsForm() {
  const { isLoading, settings } = useGetSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();
  const {
    "minimum-booking-length": minimumBookingLength,
    "max-booking-length": maxBookingLength,
    "max-guests-per-booking": maxGuestsPerBooking,
    "breakfast-price": breakfastPrice,
  } = settings || {};
  if (isLoading) return <Spinner />;
  function handleUpdate(e, field) {
    const { value } = e.target;
    if (!value) return;
    updateSetting({ [field]: value });
  }
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minimumBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minimum-booking-length")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "max-booking-length")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "max-guests-per-booking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "breakfast-price")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editigValues } = cabinToEdit;
  const { createCabins, isCreating } = useCreateCabin();
  const { updateCabin, isUpdating } = useEditCabin();
  const isEditingSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditingSession
      ? {
          name: editigValues.name,
          regularPrice: editigValues["regular-price"],
          maxCapacity: editigValues["max-capacity"],
          discount: editigValues.discount,
          description: editigValues.description,
        }
      : {},
  });
  const { errors } = formState;
  const isWorking = isCreating || isUpdating;
  function onSumbit(data) {
    const cabinData = {
      name: data.name,
      "regular-price": Number(data.regularPrice),
      "max-capacity": Number(data.maxCapacity),
      discount: Number(data.discount),
      image: data.image?.[0] || editigValues.image,
    };
    isEditingSession
      ? updateCabin({ id: editId, updatedCabin: cabinData })
      : createCabins(cabinData, {
          onSuccess: () => reset(),
        });
    onCloseModal?.();
  }
  function onError(error) {
    console.log(error);
  }
  return (
    <Form
      onSubmit={handleSubmit(onSumbit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label={"Cabin Name"} errors={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "this Field Is Required",
          })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label={"Maximum Capacity"} errors={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This Field Is Requried",
            validate: (value) =>
              value > 1 || "This Field Must Be Greater Than 1",
          })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label={"Regular Price"} errors={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            validate: (value) => value > 1 || "Value Must Be Greater Than 1",
            required: "This Value Is Requried",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label={"Discount"} errors={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "this Field Is Requred",
            validate: (value) => {
              const discount = Number(value);
              const price = getValues().regularPrice;
              if (discount < 0) {
                return "Discount Number Cannot Be Less Than Zero";
              }
              if (discount > price) {
                return "Discount Number Cannot Be Greater Than Price";
              }
              return true;
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label={"Descripiton for website"}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description")}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label={"cabin Photo"}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditingSession ? false : "This Filed Is Requried",
          })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {" "}
          {isEditingSession ? "Edit Cabin" : "Create New Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignup from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, handleSubmit, getValues, reset } = useForm();
  const { errors } = formState;
  const { signup, isLoading } = useSignup();
  function handleSubmitData({ fullname, email, password }) {
    if (!fullname && !email && !password) return null;
    signup({ fullname, email, password }, { onSettled: () => reset() });
  }
  return (
    <Form onSubmit={handleSubmit(handleSubmitData)}>
      <FormRow label="Full name" errors={errors?.fullname?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullname", {
            required: "this Field Is Required",
          })}
        />
      </FormRow>

      <FormRow label="Email address" errors={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "this Field Is Required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        errors={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This Field Is Required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Repeat password"
        errors={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This Field Is Required",
            validate: (value) =>
              value === getValues().password || "Password Must Match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button type="submit">
          {isLoading ? "Creating A New User..." : "Create A New User"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;

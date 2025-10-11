import Heading from "../ui/Heading";
import SignupForm from "../features/authentication/SignupForm";
function NewUsers() {
  return (
    <>
      <Heading as="h3">Create a new user</Heading>
      <SignupForm />
    </>
  );
}

export default NewUsers;

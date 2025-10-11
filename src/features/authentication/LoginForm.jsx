import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogin } from "./useLogin";
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { Login, isLoginingIn } = useLogin();
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    Login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input
          type="email"
          id="email"
          autoComplete="current-email"
          autoCapitalize="off"
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())} // ← Force lowercase
        />
      </FormRow>
      <FormRow label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRow>
      <FormRow>
        <Button sizes="large">
          {!isLoginingIn ? "Login" : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;

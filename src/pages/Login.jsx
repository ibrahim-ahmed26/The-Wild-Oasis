import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: linear-gradient(
    135deg,
    var(--color-brand-50),
    var(--color-grey-100)
  );

  padding: 2.4rem;
`;

const Card = styled.section`
  border-radius: 1.6rem;
  padding: 4rem 4.8rem;
  width: 100%;
  max-width: 42rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--color-grey-800);
  text-align: center;
  letter-spacing: 0.3px;
`;

function Login() {
  return (
    <LoginLayout>
      <Card>
        <Logo />
        <Title>Welcome Back 👋</Title>
        <LoginForm />
      </Card>
    </LoginLayout>
  );
}

export default Login;

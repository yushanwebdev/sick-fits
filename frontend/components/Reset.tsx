import { gql, useMutation } from "@apollo/client";
import useForm from "../lib/useForm";
import Form from "./styles/Form";
import DisplayError from "./DisplayError";

interface IResetFormProps {
  token: string;
}

const RESET_PASSWORD = gql`
  mutation ResetPassword($email: String!, $token: String!, $password: String!) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

export default function ResetForm({ token }: IResetFormProps) {
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
    password: "",
    token,
  });
  const [reset, { data, error }] = useMutation(RESET_PASSWORD, {
    variables: inputs,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // stop the form from submitting
    // Send the email and password to the graphqlAPI
    await reset().catch(console.error);
    resetForm();
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset Your Password</h2>
      <DisplayError error={error || data?.redeemUserPasswordResetToken} />

      <fieldset>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! You can now sign in!</p>
        )}

        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Reset!</button>
      </fieldset>
    </Form>
  );
}

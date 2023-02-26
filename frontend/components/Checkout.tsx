import { gql, useMutation } from "@apollo/client";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe, StripeError } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import nProgress from "nprogress";
import { useState } from "react";
import styled from "styled-components";
import { useCart } from "../lib/cartState";
import { CURRENT_USER_QUERY } from "../lib/useUser";
import SickButton from "./styles/SickButton";

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrderMutation($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm() {
  const [error, setError] = useState<StripeError | undefined>();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [checkout, { error: graphQLError }] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [
        {
          query: CURRENT_USER_QUERY,
        },
      ],
    }
  );
  const router = useRouter();
  const { closeCart } = useCart();

  async function handleSubmit(e) {
    // 1. Stop the form from submitting & turn the loader on
    e.preventDefault();
    setLoading(true);
    console.log("We gotta to do some work...");
    // 2. Start the page transition
    nProgress.start();
    // 3. Create the payment method via stripe (Token comes back here if successful)
    const { error: stripeError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

    // 4. Handle any errors from stripe
    if (stripeError) {
      setError(stripeError);
      nProgress.done();
      return; // stops the checkout from happening
    }
    // 5. Send the token from step 3 to our keystone server, via a custom mutation
    console.log("paymentMethod", paymentMethod);
    const order = await checkout({
      variables: {
        token: paymentMethod.id,
      },
    });
    console.log("Finished with the order!!", order);
    // 6. Change the page to view the order
    router.push({
      pathname: "/order/[id]",
      query: {
        id: order.data.checkout.id,
      },
    });
    // 7. Close the cart
    closeCart();

    // 8. turn the loader off
    setLoading(false);
    nProgress.done();
  }

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && (
        <p
          style={{
            fontSize: "1.2rem",
          }}
        >
          {error.message}
        </p>
      )}
      {graphQLError && (
        <p
          style={{
            fontSize: "1.2rem",
          }}
        >
          {graphQLError.message}
        </p>
      )}
      <CardElement />
      <SickButton>Check Out Now</SickButton>
    </CheckoutFormStyles>
  );
}

export default function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}

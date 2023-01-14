/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/prop-types */
import { gql, useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from '../lib/useUser';

const ADD_TO_CART_MUTATION = gql`
  mutation AddToCart($id: ID!) {
    addToCart(productId: $id) {
      id
      quantity
    }
  }
`;

export default function AddToCart({ id }) {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: {
      id,
    },
    refetchQueries: [CURRENT_USER_QUERY],
  });

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <button type="button" onClick={addToCart} disabled={loading}>
      Add{loading && 'ing'} to Cart 🛒
    </button>
  );
}

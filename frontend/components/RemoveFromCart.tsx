/* eslint-disable @typescript-eslint/ban-ts-comment */
import { gql, useMutation } from '@apollo/client';
import styled from 'styled-components';

interface IRemoveFromCartProps {
  id: string;
}

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${({ theme }) => theme.colors.red};
    cursor: pointer;
  }
`;

const REMOVE_FROM_CART_MUTATION = gql`
  mutation RemoveFromCart($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

function update(cache, payload) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

export default function RemoveFromCart({ id }: IRemoveFromCartProps) {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    update,
    optimisticResponse: {
      deleteCartItem: {
        __typename: 'CartItem',
        id,
      },
    },
  });

  return (
    <BigButton
      type="button"
      title="Remove This Item from Cart"
      // @ts-ignore
      onClick={removeFromCart}
      disabled={loading}
    >
      &times;
    </BigButton>
  );
}

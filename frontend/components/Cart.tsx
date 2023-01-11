/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import styled from 'styled-components';
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';
import { useUser } from '../lib/useUser';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';

interface CartItemProps {
  cartItem: {
    quantity: number;
    id: string;
    product: {
      name: string;
      price: number;
      photo: {
        image: {
          publicUrlTransformed: string;
        };
      };
    };
  };
}

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

function CartItem({ cartItem }: CartItemProps) {
  const { product } = cartItem;

  return (
    <CartItemStyles>
      <img
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
        width="100"
      />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * cartItem.quantity)} -{' '}
          <em>
            {cartItem.quantity} &times; {formatMoney(product.price)} each
          </em>
        </p>
      </div>
    </CartItemStyles>
  );
}

export default function Cart() {
  const me = useUser();

  if (!me) return null;

  console.log('me', me);

  return (
    <CartStyles open>
      <header>
        <Supreme>{me.name}'s Cart</Supreme>
      </header>
      <ul>
        {me.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
      </footer>
    </CartStyles>
  );
}

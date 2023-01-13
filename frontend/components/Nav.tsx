/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from 'next/link';
import { useCart } from '../lib/cartState';
import { useUser } from '../lib/useUser';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';

export default function Nav() {
  const { openCart } = useCart();
  const authUser = useUser();

  return (
    <NavStyles>
      <Link href="/products">PRODUCTS</Link>
      {authUser && (
        <>
          <Link href="/sell">SELL</Link>
          <Link href="/orders">ORDERS</Link>
          <Link href="/account">ACCOUNT</Link>
          <SignOut />
          <button type="button" onClick={openCart}>
            My Cart
          </button>
        </>
      )}
      {!authUser && <Link href="/signin">Sign In</Link>}
    </NavStyles>
  );
}

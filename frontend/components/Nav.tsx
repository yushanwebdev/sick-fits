/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from 'next/link';
import { useUser } from '../lib/useUser';
import NavStyles from './styles/NavStyles';

export default function Nav() {
  const authUser = useUser();

  return (
    <NavStyles>
      <Link href="/products">PRODUCTS</Link>
      {authUser && (
        <>
          <Link href="/sell">SELL</Link>
          <Link href="/orders">ORDERS</Link>
          <Link href="/account">ACCOUNT</Link>
        </>
      )}
      {!authUser && <Link href="/signin">Sign In</Link>}
    </NavStyles>
  );
}

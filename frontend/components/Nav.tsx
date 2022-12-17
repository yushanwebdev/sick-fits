import Link from 'next/link';
import NavStyles from './styles/NavStyles';

export default function Nav() {
  return (
    <NavStyles>
      <Link href="/products">PRODUCTS</Link>
      <Link href="/sell">SELL</Link>
      <Link href="/orders">ORDERS</Link>
      <Link href="/account">ACCOUNT</Link>
    </NavStyles>
  );
}

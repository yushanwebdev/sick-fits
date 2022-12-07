import Link from 'next/link';

export default function Nav() {
  return (
    <nav>
      <Link href="/products">PRODUCTS</Link>
      <Link href="/sell">SELL</Link>
      <Link href="/orders">ORDERS</Link>
      <Link href="/account">ACCOUNT</Link>
    </nav>
  );
}

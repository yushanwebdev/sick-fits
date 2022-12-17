import Link from 'next/link';
import formatMoney from '../lib/formatMoney';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import TitleStyles from './styles/TitleStyles';

export default function Product({ product }) {
  return (
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <TitleStyles>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </TitleStyles>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      {/* TODO: Add buttons to edit and delete item */}
    </ItemStyles>
  );
}

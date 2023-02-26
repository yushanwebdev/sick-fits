import Link from "next/link";
import formatMoney from "../lib/formatMoney";
import { useUser } from "../lib/useUser";
import { IProduct } from "../types";
import AddToCart from "./AddToCart";
import DeleteProduct from "./DeleteProduct";
import ItemStyles from "./styles/ItemStyles";
import PriceTag from "./styles/PriceTag";
import TitleStyles from "./styles/TitleStyles";

interface IProductProps {
  product: IProduct;
}

export default function Product({ product }: IProductProps) {
  const me = useUser();

  const canManageProductsPermission = me?.role?.canManageProducts;

  const canManageProductsRule = () => {
    if (!me) {
      return false;
    }

    if (canManageProductsPermission) {
      return true;
    }

    // @ts-ignore
    return me.id === product.user?.id;
  };

  return (
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <TitleStyles>
        <Link href={`/product/${product.id}`} role="link">
          {product.name}
        </Link>
      </TitleStyles>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      {me ? (
        <div className="buttonList">
          {canManageProductsRule() ? (
            <Link
              href={{
                pathname: "update",
                query: {
                  id: product.id,
                },
              }}
            >
              Edit ✏️
            </Link>
          ) : null}
          <AddToCart id={product.id} />
          {canManageProductsRule() ? (
            <DeleteProduct id={product.id}>Delete</DeleteProduct>
          ) : null}
        </div>
      ) : null}
    </ItemStyles>
  );
}

import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import { IProduct } from '../types';
import Product from './Product';
import { perPage } from '../config';

interface IProductsProps {
  page: number;
}

export const ALL_PRODUCTS_QUERY = gql`
  query GetAllProducts($skip: Int = 0, $first: Int = 4) {
    allProducts(first: $first, skip: $skip) {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products({ page }: IProductsProps) {
  // TODO: fix this error
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, loading, error } = useQuery<{ allProducts: IProduct[] }>(
    ALL_PRODUCTS_QUERY,
    {
      variables: {
        skip: page * perPage - perPage,
        first: perPage,
      },
    }
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <ProductListStyles>
      {data?.allProducts.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </ProductListStyles>
  );
}

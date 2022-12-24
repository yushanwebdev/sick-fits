/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import styled from 'styled-components';
import DisplayError from './DisplayError';

interface ISingleProductProps {
  id: string;
}

export const SINGLE_ITEM_QUERY = gql`
  query FindProduct($id: ID!) {
    Product(where: { id: $id }) {
      name
      description
      price
      id
      photo {
        image {
          publicUrlTransformed
        }
        altText
      }
    }
  }
`;

const ProductStyles = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  max-width: var(--maxWidth);
  gap: 2rem;

  img {
    width: 100%;
    object-fit: contain;
  }
`;

export default function SingleProduct({ id }: ISingleProductProps) {
  const { loading, error, data } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <DisplayError error={error} />;
  }

  const { Product } = data;

  return (
    <ProductStyles>
      <Head>
        <title>Sick Fits | {Product.name}</title>
      </Head>
      <img
        src={Product.photo.image.publicUrlTransformed}
        alt={Product.photo.altText}
      />
      <div className="details">
        <h2>{Product.name}</h2>
        <p>{Product.description}</p>
      </div>
    </ProductStyles>
  );
}

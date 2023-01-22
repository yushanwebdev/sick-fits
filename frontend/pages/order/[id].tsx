/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DisplayError from '../../components/DisplayError';
import OrderStyles from '../../components/styles/OrderStyles';
import formatMoney from '../../lib/formatMoney';

const SINGLE_ORDER_QUERY = gql`
  query SingleOrderQuery($id: ID!) {
    order: Order(where: { id: $id }) {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

export default function SingleOrder() {
  const { query } = useRouter();
  const { data, error, loading } = useQuery(SINGLE_ORDER_QUERY, {
    variables: {
      id: query.id,
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <DisplayError error={error} />;
  }

  const { order } = data;

  return (
    <OrderStyles>
      <Head>
        <title>{`Sick Fits - ${order.id}`}</title>
      </Head>
      <p>
        <span>Order Id:</span>
        <span>{order.id}</span>
      </p>
      <p>
        <span>Charge:</span>
        <span>{order.charge}</span>
      </p>
      <p>
        <span>Total:</span>
        <span>{formatMoney(order.total)}</span>
      </p>
      <p>
        <span>Item Count:</span>
        <span>{order.items.length}</span>
      </p>
      {order.items.map((item) => (
        <div className="order-item" key={item.id}>
          <img src={item.photo.image.publicUrlTransformed} alt={item.title} />
          <div className="item-details">
            <h2>{item.name}</h2>
            <p>Qty: {item.quantity}</p>
            <p>Each: {formatMoney(item.price)}</p>
            <p>Sub Total: {formatMoney(item.price * item.quantity)}</p>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </OrderStyles>
  );
}

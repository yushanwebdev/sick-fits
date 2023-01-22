/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import DisplayError from '../components/DisplayError';
import OrderItemStyles from '../components/styles/OrderItemStyles';
import formatMoney from '../lib/formatMoney';

const USER_ORDERS_QUERY = gql`
  query UserOrdersQuery {
    allOrders {
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

const OrderUlStyles = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

function countItemsInAnOrder(order) {
  return order.items.reduce((tally, item) => tally + item.quantity, 0);
}

export default function Orders() {
  const { data, error, loading } = useQuery(USER_ORDERS_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <DisplayError error={error} />;
  }

  const { allOrders } = data;

  return (
    <div>
      <Head>
        <title>Your Orders {allOrders.length}</title>
      </Head>
      <h2>You have {allOrders.length} orders!</h2>
      <OrderUlStyles>
        {allOrders.map((order) => (
          <OrderItemStyles>
            <Link href={`/order/${order.id}`}>
              <div className="order-meta">
                <p>
                  {countItemsInAnOrder(order)} Item
                  {countItemsInAnOrder(order) > 1 ? 's' : ''}
                </p>
                <p>
                  {order.items.length} Product
                  {order.items.length > 1 ? 's' : ''}
                </p>
                <p>{formatMoney(order.total)}</p>
              </div>
              <div className="images">
                {order.items.map((item) => (
                  <img
                    key={item.id}
                    src={item.photo?.image?.publicUrlTransformed}
                    alt={item.name}
                  />
                ))}
              </div>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUlStyles>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useRouter } from 'next/router';
import Pagination from '../../components/Pagination';
import Products, { ALL_PRODUCTS_QUERY } from '../../components/Products';
import { addApolloState, initializeApollo } from '../../lib/apolloClient';

export default function ProductsPage() {
  const { query } = useRouter();

  const page = +query.page || 1;

  return (
    <div>
      <Pagination page={page} />
      <Products />
      <Pagination page={page} />
    </div>
  );
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_PRODUCTS_QUERY,
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}

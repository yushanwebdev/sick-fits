/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ALL_PRODUCTS_QUERY } from '../components/Products';
import { perPage } from '../config';
import { addApolloState, initializeApollo } from '../lib/apolloClient';
import ProductsPage from './products';

export async function getServerSideProps() {
  try {
    const apolloClient = initializeApollo();

    await apolloClient.query({
      query: ALL_PRODUCTS_QUERY,
      variables: {
        skip: 0,
        first: perPage,
      },
    });

    return addApolloState(apolloClient, {
      props: {},
    });
  } catch (error) {
    console.log(error);
  }
}

export default ProductsPage;

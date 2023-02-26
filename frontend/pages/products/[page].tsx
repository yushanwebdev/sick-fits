import ProductsPage from ".";
import { PAGINATION_QUERY } from "../../components/Pagination";
import { ALL_PRODUCTS_QUERY } from "../../components/Products";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_PRODUCTS_QUERY,
  });

  await apolloClient.query({
    query: PAGINATION_QUERY,
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}

export default ProductsPage;

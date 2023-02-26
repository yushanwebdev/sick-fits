import { ALL_PRODUCTS_QUERY } from "../components/Products";
import { perPage } from "../config";
import { addApolloState, initializeApollo } from "../lib/apolloClient";
import { CURRENT_USER_QUERY } from "../lib/useUser";
import ProductsPage from "./products";

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

    await apolloClient.query({
      query: CURRENT_USER_QUERY,
    });

    return addApolloState(apolloClient, {
      props: {},
    });
  } catch (error) {
    console.log(error);
  }
}

export default ProductsPage;

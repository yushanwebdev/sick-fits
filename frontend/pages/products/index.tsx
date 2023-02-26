import { useRouter } from "next/router";
import Pagination from "../../components/Pagination";
import Products, { ALL_PRODUCTS_QUERY } from "../../components/Products";
import { perPage } from "../../config";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";

export default function ProductsPage() {
  const { query } = useRouter();

  const page = +query.page || 1;

  return (
    <div>
      <Pagination page={page} />
      <Products page={page} />
      <Pagination page={page} />
    </div>
  );
}

export async function getServerSideProps() {
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
}

import { useRouter } from "next/router";
import SingleProduct, {
  SINGLE_ITEM_QUERY,
} from "../../components/SingleProduct";
import { addApolloState, initializeApollo } from "../../lib/apolloClient";

export default function Product() {
  const { query } = useRouter();

  return <SingleProduct id={query.id as string} />;
}

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: SINGLE_ITEM_QUERY,
    variables: {
      id: ctx.params.id,
    },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}

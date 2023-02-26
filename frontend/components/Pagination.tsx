import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import DisplayError from "./DisplayError";
import PaginationStyles from "./styles/PaginationStyles";
import { perPage } from "../config";

interface IPaginationProps {
  page: number;
}

export const PAGINATION_QUERY = gql`
  query ProductCount {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }: IPaginationProps) {
  const { loading, error, data } = useQuery(PAGINATION_QUERY);

  const productTotal = data?._allProductsMeta.count ?? perPage;

  const pageCount = Math.ceil(productTotal / perPage);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <DisplayError error={error} />;
  }

  return (
    <PaginationStyles data-testid="pagination">
      <Head>
        <title>{`Sick Fits - Page ${page} of ${productTotal}`}</title>
      </Head>
      <Link href={`/products/${page - 1}`} aria-disabled={page <= 1}>
        ← Prev
      </Link>
      <p>
        {`Page ${page} of `}
        <span data-testid="pageCount">{pageCount}</span>
      </p>
      <p>{`${productTotal} Items Total`}</p>
      <Link href={`/products/${page + 1}`} aria-disabled={page >= pageCount}>
        Next →
      </Link>
    </PaginationStyles>
  );
}

import { gql, useMutation } from '@apollo/client';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      name
    }
  }
`;

export default function DeleteProduct({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
  });

  return (
    <button
      type="button"
      onClick={() => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete this item?')) {
          // go ahead and delete it
          deleteProduct().catch((err) => alert((err as Error).message));
        }
      }}
    >
      {children}
    </button>
  );
}

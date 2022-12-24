/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { gql, useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import useForm from '../lib/useForm';
import DisplayError from './DisplayError';
import { SINGLE_ITEM_QUERY } from './SingleProduct';
import Form from './styles/Form';

interface IUpdateProductProps {
  id: string;
}

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }: IUpdateProductProps) {
  // 1. We need to get the existing product
  const { loading, error, data } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });

  // 2. We need to get the mutation to update the product
  const [
    updateProduct,
    { loading: updateLoading, error: updateError, data: updateData },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);
  // 2.5 Create some state for the form inputs:
  const { inputs, handleChange, clearForm, updateForm } = useForm<{
    name: string;
    price: number;
    description: string;
  }>({
    name: '',
    price: 0,
    description: '',
  });

  useEffect(() => {
    if (data?.Product) {
      updateForm(data.Product);
    }
  }, [data]);

  // 3. We need the form to handle the updates
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();

        try {
          const res = await updateProduct({
            variables: {
              id,
              name: inputs.name,
              price: inputs.price,
              description: inputs.description,
            },
          });
        } catch (errorRequest) {
          console.error('error', (errorRequest as Error).message);
        }
      }}
    >
      <DisplayError error={updateError || error} />
      <fieldset
        aria-busy={updateLoading || loading}
        disabled={updateLoading || loading}
      >
        <label>
          Name
          <input
            required
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Price
          <input
            required
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label>
          Description
          <textarea
            required
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update</button>
      </fieldset>
    </Form>
  );
}

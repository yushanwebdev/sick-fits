import { gql, useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import DisplayError from './DisplayError';
import Form from './styles/Form';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # Which variables are getting passed in? And what types are they
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

export default function CreateProduct() {
  const { inputs, handleChange, clearForm } = useForm<{
    image: string;
    name: string;
    price: number;
    description: string;
  }>({
    image: '',
    name: 'Nice Shoes',
    price: 34234,
    description: 'These are the best shoes!',
  });
  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
    }
  );

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();

        try {
          // Submit the input fields to the backend:
          const res = await createProduct();

          clearForm();
        } catch (errorRequest) {
          console.error('error', (errorRequest as Error).message);
        }
      }}
    >
      <DisplayError error={error} />
      <fieldset aria-busy={loading} disabled={loading}>
        <label>
          Image
          <input type="file" id="image" name="image" onChange={handleChange} />
        </label>
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
        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  );
}

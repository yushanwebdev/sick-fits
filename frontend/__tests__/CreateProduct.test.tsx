import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import CreateProduct, {
  CREATE_PRODUCT_MUTATION,
} from "../components/CreateProduct";
import userEvent from "@testing-library/user-event";
import { fakeItem } from "../lib/testUtils";
import { ALL_PRODUCTS_QUERY } from "../components/Products";
import mockRouter from "next-router-mock";

jest.mock("next/router", () => require("next-router-mock"));

const item = fakeItem();

describe("<CreateProduct />", () => {
  it("renders and matches snapshot", () => {
    const { container, debug } = render(
      <MockedProvider>
        <CreateProduct />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it("handles the updating", async () => {
    // 1. render the form out
    const { container, debug } = render(
      <MockedProvider>
        <CreateProduct />
      </MockedProvider>
    );
    // 2. type into the boxes
    await userEvent.type(screen.getByPlaceholderText(/Name/i), item.name);
    await userEvent.type(
      screen.getByPlaceholderText(/Price/i),
      item.price.toString()
    );
    await userEvent.type(
      screen.getByPlaceholderText(/Description/i),
      item.description
    );

    // 3. check that those boxes are populated!
    expect(screen.getByDisplayValue(item.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(item.price)).toBeInTheDocument();
    expect(screen.getByDisplayValue(item.description)).toBeInTheDocument();
  });

  it("creates the items when the form is submitted", async () => {
    // create the mocks for this one
    const mocks = [
      {
        request: {
          query: CREATE_PRODUCT_MUTATION,
          variables: {
            name: item.name,
            description: item.description,
            image: "",
            price: item.price,
          },
        },
        result: {
          data: {
            createProduct: {
              ...item, // add fake item fields
              id: "abc123",
              __typename: "Item",
            },
          },
        },
      },
      {
        request: {
          query: ALL_PRODUCTS_QUERY,
          variables: {
            skip: 0,
            first: 2,
          },
        },
        result: {
          data: {
            allProducts: [item],
          },
        },
      },
    ];

    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <CreateProduct />
      </MockedProvider>
    );

    // Type into the inputs
    await userEvent.type(screen.getByPlaceholderText(/Name/i), item.name);
    await userEvent.type(
      screen.getByPlaceholderText(/Price/i),
      item.price.toString()
    );
    await userEvent.type(
      screen.getByPlaceholderText(/Description/i),
      item.description
    );

    // Submit it and see if the page change has been called
    await userEvent.click(screen.getByText(/Add Product/));

    expect(mockRouter).toMatchObject({
      asPath: `/product/abc123`,
    });
  });
});

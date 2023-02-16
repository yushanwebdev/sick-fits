import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import Nav from "../components/Nav";
import { CartStateProvider } from "../lib/cartState";
import { fakeCartItem, fakeUser } from "../lib/testUtils";
import { CURRENT_USER_QUERY } from "../lib/useUser";
import { theme } from "../pages/_app";

const notSignedInMocks = [
  {
    request: {
      query: CURRENT_USER_QUERY,
    },
    result: {
      data: {
        authenticatedItem: null,
      },
    },
  },
];

const signedInMocks = [
  {
    request: {
      query: CURRENT_USER_QUERY,
    },
    result: {
      data: {
        authenticatedItem: fakeUser(),
      },
    },
  },
];

const signedInMocksWithCartItems = [
  {
    request: {
      query: CURRENT_USER_QUERY,
    },
    result: {
      data: {
        authenticatedItem: fakeUser({
          cart: [fakeCartItem()],
        }),
      },
    },
  },
];

describe("<Nav />", () => {
  it("Renders and minimal nav when signed out", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <CartStateProvider>
          <MockedProvider mocks={notSignedInMocks}>
            <Nav />
          </MockedProvider>
        </CartStateProvider>
      </ThemeProvider>
    );

    expect(container).toHaveTextContent("Sign In");
    expect(container).toMatchSnapshot();

    const link = screen.getByText("Sign In");
    expect(link).toHaveAttribute("href", "/signin");
    expect(container).toHaveTextContent("Sign In");

    const productsLink = screen.getByText("PRODUCTS");
    expect(productsLink).toBeInTheDocument();
    expect(productsLink).toHaveAttribute("href", "/products");
  });

  it("Renders a full nav when signed in", async () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <CartStateProvider>
          <MockedProvider mocks={signedInMocks}>
            <Nav />
          </MockedProvider>
        </CartStateProvider>
      </ThemeProvider>
    );
    await screen.findByText("ACCOUNT");

    expect(container).toMatchSnapshot();
    expect(container).toHaveTextContent("Sign Out");
    expect(container).toHaveTextContent("My Cart");
  });

  it("Renders the amount of items in the Cart", async () => {
    render(
      <ThemeProvider theme={theme}>
        <CartStateProvider>
          <MockedProvider mocks={signedInMocksWithCartItems}>
            <Nav />
          </MockedProvider>
        </CartStateProvider>
      </ThemeProvider>
    );

    await screen.findByText("ACCOUNT");
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});

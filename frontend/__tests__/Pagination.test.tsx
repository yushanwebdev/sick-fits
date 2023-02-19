import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import Pagination from "../components/Pagination";
import { makePaginationMocksFor } from "../lib/testUtils";
import { theme } from "../pages/_app";

describe("<Pagination />", () => {
  it("displays a loading message", () => {
    const { container } = render(
      <MockedProvider mocks={makePaginationMocksFor(1)}>
        <ThemeProvider theme={theme}>
          <Pagination page={1} />
        </ThemeProvider>
      </MockedProvider>
    );

    expect(container).toHaveTextContent("Loading...");
  });

  it("renders pagination for 18 items", async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(18)}>
        <ThemeProvider theme={theme}>
          <Pagination page={1} />
        </ThemeProvider>
      </MockedProvider>
    );

    await screen.findByTestId("pagination");
    expect(container).toHaveTextContent("Page 1 of 5");

    const pageCountSpan = screen.getByTestId("pageCount");
    expect(pageCountSpan).toHaveTextContent("5");

    expect(container).toMatchSnapshot();
  });

  it("disables the prev page on first page", async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(12)}>
        <ThemeProvider theme={theme}>
          <Pagination page={1} />
        </ThemeProvider>
      </MockedProvider>
    );

    await screen.findByTestId("pagination");
    const prevButton = screen.getByText(/Prev/);
    const nextButton = screen.getByText(/Next/);
    expect(prevButton).toHaveAttribute("aria-disabled", "true");
    expect(nextButton).toHaveAttribute("aria-disabled", "false");
  });

  it("disables the next page on last page", async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(12)}>
        <ThemeProvider theme={theme}>
          <Pagination page={3} />
        </ThemeProvider>
      </MockedProvider>
    );

    await screen.findByTestId("pagination");
    const prevButton = screen.getByText(/Prev/);
    const nextButton = screen.getByText(/Next/);
    expect(prevButton).toHaveAttribute("aria-disabled", "false");
    expect(nextButton).toHaveAttribute("aria-disabled", "true");
  });

  it("enables all on middle page", async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(12)}>
        <ThemeProvider theme={theme}>
          <Pagination page={2} />
        </ThemeProvider>
      </MockedProvider>
    );

    await screen.findByTestId("pagination");
    const prevButton = screen.getByText(/Prev/);
    const nextButton = screen.getByText(/Next/);
    expect(prevButton).toHaveAttribute("aria-disabled", "false");
    expect(nextButton).toHaveAttribute("aria-disabled", "false");
  });
});

import { act, render, screen, waitFor } from "@testing-library/react";
import { before } from "lodash";
import { ThemeProvider } from "styled-components";
import wait from "waait";
import CartCount from "../components/CartCount";
import { theme } from "../pages/_app";

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

describe("<CartCount />", () => {
  it("Renders", () => {
    render(
      <ThemeProvider theme={theme}>
        <CartCount count={10} />
      </ThemeProvider>
    );
  });

  it("Matches snapshot", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <CartCount count={10} />
      </ThemeProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it("updates via props", async () => {
    const { container, rerender, debug } = render(
      <ThemeProvider theme={theme}>
        <CartCount count={11} />
      </ThemeProvider>
    );

    expect(container.textContent).toBe("11");
    // same
    // expect(container).toHaveTextContent("11");

    // Update the props
    rerender(
      <ThemeProvider theme={theme}>
        <CartCount count={12} />
      </ThemeProvider>
    );
    expect(container.textContent).toBe("1211");
    act(() => jest.advanceTimersByTime(400));
    expect(container.textContent).toBe("12");
    expect(container).toMatchSnapshot();
  });
});

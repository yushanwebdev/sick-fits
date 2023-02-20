import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import SignUp, { SIGN_UP_MUTATION } from "../components/SignUp";
import { fakeUser } from "../lib/testUtils";
import userEvent from "@testing-library/user-event";

const me = fakeUser();

const password = "wes";

const mocks = [
  // Mutation Mock
  {
    request: {
      query: SIGN_UP_MUTATION,
      variables: {
        name: me.name,
        email: me.email,
        password,
      },
    },
    result: {
      data: {
        createUser: {
          __typename: "User",
          id: "abc123",
          email: me.email,
          name: me.name,
        },
      },
    },
  },
];

describe("<SignUp/>", () => {
  it("render and matches snapshot", () => {
    const { container } = render(
      <MockedProvider>
        <SignUp />
      </MockedProvider>
    );

    expect(container).toMatchSnapshot();
  });

  it("calls the mutation properly", async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <SignUp />
      </MockedProvider>
    );

    // Type into the boxes
    await userEvent.type(screen.getByPlaceholderText("Your Name"), me.name);
    await userEvent.type(
      screen.getByPlaceholderText("Your Email Address"),
      me.email
    );
    await userEvent.type(screen.getByPlaceholderText("Password"), password);

    // Click the submit
    await userEvent.click(screen.getByText("Sign Up!"));
    await screen.findByText(
      `Signed Up with ${me.email} - Please Go Ahead and Sign in!`
    );
  });
});

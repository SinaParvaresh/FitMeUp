import { create } from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import Register from "./Register";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Login from "./Login";

describe("Registration Page", () => {
  test("Render the Registration Page", () => {
    const component = create(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    ).toJSON();
    expect(component).toMatchSnapshot();
  });

  test("First name empty input validation", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    const firstNameError = screen.getByText(/invalid name/i);
    expect(firstNameError).toBeInTheDocument();
  });

  test("First name not empty field validation", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const firstName = "Sina";
    const firstNameError = screen.getByText(/invalid name/i);

    await user.type(screen.getByPlaceholderText(/first name/i), firstName);
    expect(screen.getByPlaceholderText(/first name/i)).toHaveValue("Sina");
    expect(firstNameError).not.toBeInTheDocument();
  });

  test("Component routes Sign in link to Log in component", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const component = create(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    ).toJSON();

    user.click(
      screen.getByRole("link", {
        name: /sign in/i,
      })
    );

    await waitFor(() => {
      expect(component).toMatchSnapshot();
    });
  });
});

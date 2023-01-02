import userEvent from "@testing-library/user-event";
import { create } from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import Login from "./Login";
import PasswordReset from "./PasswordReset";
import Register from "./Register";

describe("Login page", () => {
  test("Login Page renders correctly", () => {
    const component = create(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    ).toJSON();

    expect(component).toMatchSnapshot();
  });

  test("Component routes Forgot Password link to PasswordReset component", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const component = create(
      <MemoryRouter>
        <PasswordReset />
      </MemoryRouter>
    ).toJSON();

    user.click(
      screen.getByRole("link", {
        name: /forgot password/i,
      })
    );

    await waitFor(() => {
      expect(component).toMatchSnapshot();
    });
  });

  test("Component routes Sign up link to Register component", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const component = create(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    ).toJSON();

    user.click(
      screen.getByRole("link", {
        name: /sign up/i,
      })
    );

    await waitFor(() => {
      expect(component).toMatchSnapshot();
    });
  });
});

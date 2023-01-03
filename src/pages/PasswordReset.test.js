import PasswordReset from "./PasswordReset";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, act } from "@testing-library/react";

let component;

describe("Forgot Password Page Component", () => {
  // Render the component
  beforeEach(() => {
    component = render(
      <MemoryRouter>
        <PasswordReset />
      </MemoryRouter>
    );
  });

  test("Invalid Email Address Validation (POST request)", async () => {
    const user = userEvent.setup();
    const textbox = component.getByRole("textbox");
    const submitButton = component.getByRole("button", { name: /submit/i });

    // Simulate a user event for submitting an invalid email
    await user.type(textbox, "failedtest@gmail.com");
    await user.click(submitButton);
    expect(await component.findByText(/Email not found/i)).toBeInTheDocument();
  });

  test("Submit button disabled", () => {
    const user = userEvent.setup();
    user.type(component.getByRole("textbox"), "");

    expect(
      component.getByRole("button", {
        name: /submit/i,
      })
    ).toBeDisabled();
  });
});

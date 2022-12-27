import { create } from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import Register from "./Register";
const { render, screen } = require("@testing-library/react");

describe("Registration render Page", () => {
  test("Render the Registration Page", () => {
    const component = create(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    ).toJSON();
    expect(component).toMatchSnapshot();
  });
});

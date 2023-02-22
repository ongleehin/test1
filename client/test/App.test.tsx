import { describe, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import App from "../src/App";

describe("Invalid Page", () => {
  it("Renders not found if invalid path", async () => {
    render(
      <MemoryRouter initialEntries={["/somethingNonExisting"]}>
        <App />
      </MemoryRouter>
    );
    expect(
      screen.getByRole("heading", {
        level: 1,
      })
    ).toHaveTextContent("Not Found");
    const goHome = screen.getByRole("link");
    expect(goHome).toHaveTextContent("GO HOME");
    // screen.debug();
    userEvent.click(goHome);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          level: 2,
        })
      ).toHaveTextContent("URL Shortener");
    });
  });
});

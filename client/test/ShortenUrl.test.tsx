import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import { act } from "react-dom/test-utils";
import App from "../src/App";

describe("Add Shorten Url", () => {
  it("Renders Add Url Tab", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(
      screen.getByRole("heading", {
        level: 2,
      })
    ).toHaveTextContent("URL Shortener");
    expect(
      screen.getByRole("tab", {
        selected: true,
      })
    ).toHaveTextContent("Add URL");
    const shortenUrlButton = screen.getByRole("button", {
      name: "Shorten Url",
    });
    expect(shortenUrlButton).toBeDisabled();
    // });
    // it("add Url", async () => {
    const input = screen.getByRole("textbox", { name: "Enter a Url" });
    expect(input).toBeInTheDocument();

    await userEvent.type(input, "abcd", { delay: 10 });
    expect(input).toHaveValue("abcd");

    expect(shortenUrlButton).toBeEnabled();
    await act(async () => {
      userEvent.click(shortenUrlButton);
    });
    await waitFor(() => screen.getByText(/http:\/\/sho\.rt\/[a-z0-9]{7}/));
    screen.debug();

    const shortenedUrl = screen.getByRole("button", {
      name: /http:\/\/sho\.rt\/[a-z0-9]{7}/,
    });
    expect(shortenedUrl).toBeEnabled();
  });
});
describe("Manage Shorten Url", () => {
  it("Renders Manage Url Tab", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(
      screen.getByRole("heading", {
        level: 2,
      })
    ).toHaveTextContent("URL Shortener");
    // screen.debug();
  });
});

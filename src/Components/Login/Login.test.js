import { fireEvent, render, screen } from "@testing-library/react";
import Login from "./Login";

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    get: () => ({
      data: { id: 1, name: "jhon" },
    }),
  },
}));

test("username input should be rendered", () => {
  render(<Login />);
  const userInput = screen.getByPlaceholderText(/username/i);
  expect(userInput).toBeInTheDocument();
});

test("password input should be rendered", () => {
  render(<Login />);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  expect(passwordInput).toBeInTheDocument();
});

test("button should be rendered", () => {
  render(<Login />);
  const buttonInput = screen.getByRole("button");
  expect(buttonInput).toBeInTheDocument();
});

test("username input should be empty", () => {
  render(<Login />);
  const userInput = screen.getByPlaceholderText(/username/i);
  expect(userInput.value).toBe("");
});

test("password input should be empty", () => {
  render(<Login />);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  expect(passwordInput.value).toBe("");
});

test("button should be desabled", () => {
  render(<Login />);
  const buttonInput = screen.getByRole("button");
  expect(buttonInput).toBeDisabled();
});

test("error message should be not be visible", () => {
  render(<Login />);
  const errorEl = screen.getByTestId("error");
  expect(errorEl).not.toBeVisible();
});

test("username input should change", () => {
  render(<Login />);
  const userInput = screen.getByPlaceholderText(/username/i);
  const testValue = "test";
  fireEvent.change(userInput, { target: { value: testValue } });
  expect(userInput.value).toBe(testValue);
});

test("password input should change", () => {
  render(<Login />);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  fireEvent.change(passwordInput, { target: { value: testValue } });
  expect(passwordInput.value).toBe(testValue);
});

test("button should be not desabled when inputs are not empty", () => {
  render(<Login />);
  const buttonInput = screen.getByRole("button");
  const userInput = screen.getByPlaceholderText(/username/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  fireEvent.change(passwordInput, { target: { value: testValue } });
  fireEvent.change(userInput, { target: { value: testValue } });
  expect(buttonInput).not.toBeDisabled();
});

test("user be render afther feching", async () => {
  render(<Login />);
  const buttonInput = screen.getByRole("button");
  const userInput = screen.getByPlaceholderText(/username/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  fireEvent.change(passwordInput, { target: { value: testValue } });
  fireEvent.change(userInput, { target: { value: testValue } });
  fireEvent.click(buttonInput);

  const userItem = await screen.findByText("jhon");
  expect(userItem).toBeInTheDocument();
});

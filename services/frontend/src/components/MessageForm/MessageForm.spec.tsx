import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";

import MessageForm from "./MessageForm";

describe("MessageForm component", () => {
  it("submits the form with input value", () => {
    // Mock onSubmit function
    const handleSubmit = jest.fn();

    // Render the MessageForm component
    render(<MessageForm onSubmit={handleSubmit} />);

    // Get input element
    const inputElement = screen.getByPlaceholderText("viestisi tähän...");

    // Simulate typing into the input field
    fireEvent.change(inputElement, { target: { value: "Test message" } });

    // Get submit button by role
    const submitButton = screen.getByRole("button");

    // Simulate form submission
    fireEvent.submit(submitButton);

    // Assert that onSubmit function is called with correct text
    expect(handleSubmit).toHaveBeenCalledWith("Test message");

    // Assert that input value is cleared after form submission
    expect(inputElement).toHaveValue("");
  });
});

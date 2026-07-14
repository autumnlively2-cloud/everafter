/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Counter } from "./counter";

// ---------------------------------------------------------------------------
// React component tests — test behavior through user interactions, not
// implementation details. Prefer testing-library over shallow rendering.
// ---------------------------------------------------------------------------

describe("Counter", () => {
  it("renders with the default initial value of 0", () => {
    render(<Counter />);
    expect(screen.getByTestId("count-value")).toHaveTextContent("0");
  });

  it("renders with a custom initial value", () => {
    render(<Counter initialValue={10} />);
    expect(screen.getByTestId("count-value")).toHaveTextContent("10");
  });

  it("renders the label", () => {
    render(<Counter label="Score" />);
    expect(screen.getByText("Score")).toBeInTheDocument();
  });

  it("increments the count when the '+' button is clicked", () => {
    render(<Counter initialValue={5} />);
    fireEvent.click(screen.getByTestId("increment"));
    expect(screen.getByTestId("count-value")).toHaveTextContent("6");
  });

  it("decrements the count when the '-' button is clicked", () => {
    render(<Counter initialValue={5} />);
    fireEvent.click(screen.getByTestId("decrement"));
    expect(screen.getByTestId("count-value")).toHaveTextContent("4");
  });

  it("increments by the step value", () => {
    render(<Counter initialValue={0} />);

    // Change step to 3
    const stepInput = screen.getByTestId("step-input");
    fireEvent.change(stepInput, { target: { value: "3" } });

    // Increment — should go from 0 to 3
    fireEvent.click(screen.getByTestId("increment"));
    expect(screen.getByTestId("count-value")).toHaveTextContent("3");
  });

  it("resets to initial value and step 1 when Reset is clicked", () => {
    render(<Counter initialValue={10} />);

    // Change step and increment
    fireEvent.change(screen.getByTestId("step-input"), {
      target: { value: "5" },
    });
    fireEvent.click(screen.getByTestId("increment")); // 10 + 5 = 15

    expect(screen.getByTestId("count-value")).toHaveTextContent("15");

    // Reset
    fireEvent.click(screen.getByTestId("reset"));
    expect(screen.getByTestId("count-value")).toHaveTextContent("10");
    expect(screen.getByTestId("step-value")).toHaveTextContent("Step: 1");
  });

  // Edge cases
  it("does not allow step to go below 1", () => {
    render(<Counter initialValue={0} />);

    const stepInput = screen.getByTestId("step-input");
    fireEvent.change(stepInput, { target: { value: "0" } });

    // Step should be clamped to 1
    expect(screen.getByTestId("step-value")).toHaveTextContent("Step: 1");
  });

  it("handles multiple increments correctly", () => {
    render(<Counter initialValue={0} />);

    fireEvent.click(screen.getByTestId("increment"));
    fireEvent.click(screen.getByTestId("increment"));
    fireEvent.click(screen.getByTestId("increment"));

    expect(screen.getByTestId("count-value")).toHaveTextContent("3");
  });
});
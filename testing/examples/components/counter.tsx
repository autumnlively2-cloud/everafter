import { useState, type FC } from "react";

interface CounterProps {
  initialValue?: number;
  label?: string;
}

/**
 * A simple counter component for testing demonstrations.
 */
export const Counter: FC<CounterProps> = ({
  initialValue = 0,
  label = "Count",
}) => {
  const [count, setCount] = useState(initialValue);
  const [step, setStep] = useState(1);

  return (
    <div data-testid="counter">
      <h2>{label}</h2>
      <p data-testid="count-value">{count}</p>
      <div>
        <button
          data-testid="decrement"
          onClick={() => setCount((c) => c - step)}
          aria-label="Decrement"
        >
          -
        </button>
        <span data-testid="step-value">Step: {step}</span>
        <button
          data-testid="increment"
          onClick={() => setCount((c) => c + step)}
          aria-label="Increment"
        >
          +
        </button>
      </div>
      <div>
        <label htmlFor="step-input">Step size:</label>
        <input
          id="step-input"
          data-testid="step-input"
          type="number"
          min={1}
          max={10}
          value={step}
          onChange={(e) => setStep(Math.max(1, Number(e.target.value)))}
        />
      </div>
      <button
        data-testid="reset"
        onClick={() => {
          setCount(initialValue);
          setStep(1);
        }}
      >
        Reset
      </button>
    </div>
  );
};
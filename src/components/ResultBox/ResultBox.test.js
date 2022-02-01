import { cleanup, render, screen } from "@testing-library/react";
import ResultBox from "./ResultBox";
import "@testing-library/jest-dom/extend-expect";

describe("Component ResultBox", () => {
  it("should render without crashing", () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });
  it("should render proper info about conversion when PLN -> USD", () => {
    const testCases = [
      { amount: "100", result: "$28.57" },
      { amount: "20", result: "$5.71" },
      { amount: "200", result: "$57.14" },
      { amount: "340", result: "$97.14" },
    ];

    for (const testObj of testCases) {
      render(
        <ResultBox from="PLN" to="USD" amount={parseInt(testObj.amount)} />
      );
      const output = screen.getByTestId("output");
      expect(output).toHaveTextContent(
        `PLN ${testObj.amount}.00 = ${testObj.result}`
      );

      cleanup();
    }
  });
  it("should render proper info about conversion when USD -> PLN", () => {
    const testCases = [
      { amount: "100", result: "350.00" },
      { amount: "20", result: "70.00" },
      { amount: "200", result: "700.00" },
      { amount: "340", result: "1,190.00" },
    ];

    for (const testObj of testCases) {
      render(
        <ResultBox from="USD" to="PLN" amount={parseInt(testObj.amount)} />
      );
      const output = screen.getByTestId("output");
      expect(output).toHaveTextContent(
        `$${testObj.amount}.00 = PLN ${testObj.result}`
      );

      cleanup();
    }
  });
  it("should render proper info about conversion when PLN -> PLN", () => {
    render(<ResultBox from="PLN" to="PLN" amount={100} />);
    const output = screen.getByTestId("output");
    expect(output).toHaveTextContent("You can't transfer same currency!");
  });
  it("should render proper info about conversion when USD -> USD", () => {
    render(<ResultBox from="USD" to="USD" amount={100} />);
    const output = screen.getByTestId("output");
    expect(output).toHaveTextContent("You can't transfer same currency!");
  });
  it("should show 'error' when input is negative value", () => {
    render(
      <ResultBox
        from="PLN"
        to="USD"
        amount={parseInt(-100)}
      />
    );
    const output = screen.getByTestId("output");
    expect(output).toHaveTextContent("Wrong value...");
  });
});

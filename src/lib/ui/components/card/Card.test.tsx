import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("Page", () => {
  it("renders a heading", () => {
    render(<Card>A simple card</Card>);

    const text = screen.getByText("A simple card");

    expect(text).toBeInTheDocument();
  });
});

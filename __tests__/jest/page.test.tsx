import Home from "@/app/page";
import Providers from "@/lib/ui/components/providers/Providers";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Page", () => {
  it("renders a heading", () => {
    render(
      <Providers>
        <Home />
      </Providers>,
    );

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});

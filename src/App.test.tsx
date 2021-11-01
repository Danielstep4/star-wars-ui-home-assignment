import { render, screen } from "@testing-library/react";
import App from "./App";

test("the loading component should be the first to render", () => {
  render(<App />);
  expect(screen.getByRole("loader")).toBeInTheDocument();
});

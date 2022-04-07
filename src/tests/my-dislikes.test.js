import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MyDislikesMock from "../components/profile/mock-dislikes";

test("test dislike render", async () => {
  render(<MyDislikesMock />);
  const linkElement = screen.getByText(/Cat/i);
  expect(linkElement).toBeInTheDocument();
});

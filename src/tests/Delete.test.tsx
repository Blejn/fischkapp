import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { Card } from "../components/Card";

describe("Card integration tests", () => {
  test("usuwanie karty", () => {
    const mockCard = {
      _id: "test-id",
      front: "Test Front",
      back: "Test Back",
      deleteCard: jest.fn(),
      editCard: jest.fn(),
    };

    render(<Card {...mockCard} />);

    const editButton = screen.getByTestId("edit-button");
    fireEvent.click(editButton);

    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);
    expect(mockCard.deleteCard).toHaveBeenCalledWith("test-id");
    expect(screen.queryByTestId("card")).toBeNull();
  });
});

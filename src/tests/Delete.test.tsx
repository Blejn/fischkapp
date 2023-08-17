import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { Card } from "../components/Card";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.delete(
    "https://training.nerdbord.io/api/v1/fischkapp/flashcards/:id",
    (req, res, ctx) => {
      return res(ctx.status(200));
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Card integration tests", () => {
  test("deleting karty", async () => {
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

    await waitFor(() => {
      expect(mockCard.deleteCard).toHaveBeenCalledWith("test-id");
      expect(screen.queryByTestId("card")).toBeNull();
    });
  });
});

import { response, rest } from "msw";
import { setupServer } from "msw/node";
import { patchFishCard } from "../services/ApiService";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import React from "react";
import { Card } from "../components/Card";
interface CardI {
  _id: string;
  front: string;
  back: string;
  deleteCard: (_id: string) => void;
  editCard: (_id: string, front: string, back: string) => void;
}
const server = setupServer(
  rest.patch(
    "https://training.nerdbord.io/api/v1/fischkapp/flashcards/:id",
    (req, res, ctx) => {
      const { id, front, back } = req.body as {
        id: string;
        front: string;
        back: string;
      };
      if (front && back && id) {
        return res(
          ctx.status(201),
          ctx.json({ id: 1, front: "front", back: "back" })
        );
      } else {
        return res(
          ctx.status(400),
          ctx.json({ error: "Front and back are required" })
        );
      }
    }
  )
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("edit fish card", () => {
  it("handles missing front and back ", async () => {
    const id = "12345";
    const front = "";
    const back = "";
    await expect(patchFishCard(id, front, back)).rejects.toThrow(
      "Failed to edit Fishcard"
    );
  });

  it("handles missing front", async () => {
    const cardVariable: CardI = {
      _id: "12345",
      front: "front",
      back: "",
      deleteCard: jest.fn(),
      editCard: jest.fn(),
    };

    render(<Card {...cardVariable} />);
    const editButton = screen.getByTestId("edit-button");
    fireEvent.click(editButton);

    const nextButton = await screen.findByTestId("next-button");
    fireEvent.click(nextButton);

    const saveButton = await screen.findByTestId("save-button");
    fireEvent.click(saveButton);
    expect(saveButton).toBeDisabled();
  });
  it("handles missing back", async () => {
    const cardVariable: CardI = {
      _id: "12345",
      front: "",
      back: "back",
      deleteCard: jest.fn(),
      editCard: jest.fn(),
    };

    render(<Card {...cardVariable} />);
    const editButton = screen.getByTestId("edit-button");
    fireEvent.click(editButton);

    const nextButton = await screen.findByTestId("next-button");
    fireEvent.click(nextButton);

    const saveButton = await screen.findByTestId("save-button");
    fireEvent.click(saveButton);
    expect(saveButton).toBeDisabled();
  });
  it("handles edit card", async () => {
    const cardVariable: CardI = {
      _id: "12345",
      front: "front",
      back: "",
      deleteCard: jest.fn(),
      editCard: jest.fn(),
    };

    render(<Card {...cardVariable} />);
    const editButton = screen.getByTestId("edit-button");
    fireEvent.click(editButton);

    const nextButton = await screen.findByTestId("next-button");
    fireEvent.click(nextButton);

    const saveButton = await screen.findByTestId("save-button");
    fireEvent.click(saveButton);
    expect(saveButton).toBeDisabled();
  });

  it("should exit edit mode when Cancel button is clicked", () => {
    const mockEditCard = jest.fn();
    const mockDeleteCard = jest.fn();
    const cardProps = {
      _id: "123",
      front: "Front Content",
      back: "Back Content",
      deleteCard: mockDeleteCard,
      editCard: mockEditCard,
    };

    render(<Card {...cardProps} />);

    const editButton = screen.getByTestId("edit-button");
    fireEvent.click(editButton);

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(screen.getByTestId("edit-button")).toBeInTheDocument();
  });
  it("should exit edit mode when Cancel button is clicked", async () => {
    // Przygotowanie danych i funkcji pomocniczych
    const cardVariable: CardI = {
      _id: "12345",
      front: "front",
      back: "back",
      deleteCard: jest.fn(),
      editCard: jest.fn(),
    };

    render(<Card {...cardVariable} />);

    const editButton = await screen.getByTestId("edit-button");
    fireEvent.click(editButton);

    const nextButton = await screen.findByTestId("next-button");
    fireEvent.click(nextButton);

    const saveButton = await screen.findByTestId("save-button");
    fireEvent.click(saveButton);
    expect(saveButton).toBeEnabled();
  });
});

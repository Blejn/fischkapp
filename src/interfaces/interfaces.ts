interface FishkappCard {
  front: string;
  back: string;
}
interface CardI {
  _id: string;
  front: string;
  back: string;
}
interface NewCardI {
  editMode: boolean;
  setEditMode: (value: boolean) => void;
  addNewCard: (front: string, back: string) => void;
}

interface ResponseCard {
  flashcard: CardI;
}
interface InputArea {
  fishkappObject: FishkappCard;
  nextPage: boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
interface EditInputArea {
  fishkappObject: FishkappCard;
  nextPage: boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

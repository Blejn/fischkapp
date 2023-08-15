export const getFishCards = async (): Promise<CardI[]> => {
  const url: string | undefined =
    "https://training.nerdbord.io/api/v1/fischkapp/flashcards";
  if (!url) {
    console.error("FISHKAPP_POST environment variable is not set.");
    throw new Error("FISHKAPP_POST environment variable is not set.");
  }
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    if (!response.ok) {
      console.log("FAILURE");

      throw new Error("Failed to get FishCard");
    }
    return response.json();
  } catch (error) {
    throw new Error("Can't get Fishcard");
  }
};

export const addFishCard = async (
  front: string,
  back: string
): Promise<ResponseCard> => {
  const url: string | undefined =
    "https://training.nerdbord.io/api/v1/fischkapp/flashcards";
  if (!url) {
    console.error("FISHKAPP_POST environment variable is not set.");
    throw new Error("FISHKAPP_POST environment variable is not set.");
  }
  if (!front && !back) {
    throw new Error("Front and back are required");
  }
  if (!front) {
    throw new Error("Front is required");
  }
  if (!back) {
    throw new Error("Back is required");
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "secret_token",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        front: front,
        back: back,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to upload FishCard");
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};
export const patchFishCard = async (
  id: string,
  front: string,
  back: string
): Promise<any> => {
  try {
    const url: string =
      "https://training.nerdbord.io/api/v1/fischkapp/flashcards";
    const response = await fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: "secret_token",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        front: front,
        back: back,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to edit Fishcard");
    }
    return response;
  } catch (error) {
    throw error;
  }
};
export const deleteFishCard = async (id: string): Promise<any> => {
  const url: string =
    "https://training.nerdbord.io/api/v1/fischkapp/flashcards";
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "secret_token",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete FishCard");
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

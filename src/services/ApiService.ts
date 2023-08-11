export const getFishCards = async (): Promise<CardI[]> => {
  const url: string | undefined = import.meta.env.VITE_REACT_APP_FISHKAPP_POST;
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
  const url: string | undefined = import.meta.env.VITE_REACT_APP_FISHKAPP_POST;
  if (!url) {
    console.error("FISHKAPP_POST environment variable is not set.");
    throw new Error("FISHKAPP_POST environment variable is not set.");
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
export const deleteFishCard = async (id: string): Promise<any> => {
  const url: string | undefined = import.meta.env.VITE_REACT_APP_FISHKAPP_POST;
  try {
    const response = await fetch(url + "/" + id, {
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

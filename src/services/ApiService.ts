interface GetCard {
  _id: string;
  front: string;
  back: string;
}

export const getFishCards = async (): Promise<GetCard[]> => {
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

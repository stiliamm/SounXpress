export const GetAudioData = async (authToken) => {
  try {
    const response = await fetch("http://localhost:8000/users/recordings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-token": authToken,
      },
    });

    if (response.status === 401) {
      return 401;
    }

    if (!response.ok) {
      throw new Error("Network was not ok!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getConversation = async (authToken, receiverUsername) => {
  if (!authToken) {
    console.log("No token");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:8000/messages/${receiverUsername}`,
      {
        method: "GET",
        headers: {
          "x-token": authToken,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network was not ok!");
    }

    const data = await response.json();
    console.log("Server conversation data", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default getConversation;

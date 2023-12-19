const SendMessage = async (authToken, username, text) => {
  try {
    const response = await fetch(`http://localhost:8000/messages/${username}`, {
      method: "POST",
      headers: {
        "x-token": authToken,
      },
      body: JSON.stringify(text),
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
    console.log("Error fetching data", error);
  }
};

export default SendMessage;

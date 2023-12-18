const getConversation = async (authToken) => {
  if (!authToken) {
    return;
  }

  //   const response = await fetch("http://localhost:8000/messages", {
  //     method: "GET",
  //     headers: {
  //       "x-token": authToken,
  //     },
  //   });

  if (!response.ok) {
    throw new Error("Network was not ok!");
  }

  const data = await response.json();
  return data;
};

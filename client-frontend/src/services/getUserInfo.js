const getUserInfo = async (authToken) => {
  if (!authToken) {
    return;
  }

  const response = await fetch("http://localhost:8000/users/info", {
    method: "GET",
    headers: {
      "x-token": authToken,
    },
  });

  if (!response.ok) {
    throw new Error("Network was not ok!");
  }

  const data = await response.json();
  return data;
};
export default getUserInfo;

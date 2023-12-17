const handleLoginToken = async (username, password) => {
  const response = await fetch("http://localhost:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Network was not ok!");
  }

  const data = await response.json();
  return data.token;
};
export default handleLoginToken;

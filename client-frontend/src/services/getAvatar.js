const getAvatar = async (authToken) => {
  if (!authToken) {
    return;
  }

  try {
    const response = await fetch("http://localhost:8000/users/image", {
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
      if (response.status === 404) {
        return null;
      }
      throw new Error("Network was not ok!");
    }

    const photo = await response.blob();
    return photo;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return null;
  }
};
export default getAvatar;

const UploadRecord = async (authToken) => {
  try {
    const response = await fetch(
      "http://localhost:8000/users/recordings/upload",
      {
        method: "POST",
        headers: {
          "x-token": authToken,
        },
      }
    );

    if (response.status === 401) {
      return 401;
    }

    if (!response.ok) {
      throw new Error("Network was not ok!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Network was bad", error);
  }
};

export default UploadRecord;

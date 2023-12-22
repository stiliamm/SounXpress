const UploadRecord = async (authToken, fileName) => {
  try {
    const response = await fetch(
      "http://localhost:8000/users/recordings/upload",
      {
        method: "POST",
        headers: {
          "x-token": authToken,
        },
        body: fileName,
      }
    );

    if (response.status === 401) {
      return 401;
    }

    if (!response.ok) {
      throw new Error("Network was not ok!");
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.log("Network was bad", error);
  }
};

export default UploadRecord;

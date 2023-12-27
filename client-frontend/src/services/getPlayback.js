export const GetPlayback = async (username, file_name, authToken) => {
  try {
    const response = await fetch(
      `http://localhost:8000/users/recordings/play_from_dir?username=${username}&file_name=${file_name}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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

    const data = await response.blob();
    console.log("audio data", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

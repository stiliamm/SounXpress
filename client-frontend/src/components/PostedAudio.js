import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetAudioData } from "../services/getAudioFiles";
import { GetPlayback } from "../services/getPlayback";
import App from "../App";
import Cookies from "universal-cookie";

const PostedAudio = () => {
  const navigate = useNavigate();
  const [audioData, setAudioData] = useState([]);
  const cookies = new Cookies();
  const getAuthToken = () => {
    return cookies.get("authToken");
  };

  let authToken = getAuthToken();

  useEffect(() => {
    async function getAudioFiles() {
      try {
        const data = await GetAudioData(authToken);
        if (data === 401) {
          navigate("/login");
        } else {
          setAudioData(data);
        }
      } catch (error) {
        console.error("Error fetching audio files", error);
      }
    }

    getAudioFiles();
  }, [authToken, navigate]);

  const handleAudioPlayback = async (username, file_name) => {
    try {
      const aData = await GetPlayback(username, file_name, authToken);
      const audioBlob = new Blob([aData], { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error("Error fetching audio data", error);
    }
  };

  return (
    <App>
      <div className="gallery">
        <h2>New Samples</h2>
        <div className="audio-container">
          {audioData.map((file) => (
            <div className="file" key={file.id}>
              <div className="audio-info">
                <p className="filename">{file.file_name}</p>
                <p className="user">by: {file.username}</p>
                <button
                  onClick={() =>
                    handleAudioPlayback(file.username, file.file_name)
                  }
                  className="play-audio-btn"
                >
                  <ion-icon name="play-outline"></ion-icon>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </App>
  );
};

export default PostedAudio;

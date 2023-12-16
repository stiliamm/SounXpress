// import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { GetAudioData } from "../services/getAudioFiles";
import App from "../App";

const PostedAudio = () => {
  // const navigate = useNavigate();
  const [audioData, setAudioData] = useState([]);

  useEffect(() => {
    async function getAudioFiles() {
      try {
        const data = await GetAudioData();
        setAudioData(data);
      } catch (error) {
        console.error("Error fetching audio files", error);
      }
    }

    getAudioFiles();
  }, []);

  return (
    <App>
      <div className="gallery">
        <h2>New Samples</h2>
        <div className="audio-container">
          {audioData.map((file) => (
            <div className="file" key={file.id}>
              <div className="audio-info">
                <p className="id">{file.id}</p>
                <p className="filename">Name: {file.filename}</p>
                <p className="user">Username: {file.username}</p>
                {/* COMPONENT TO PLAY THE AUDIO FILE */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </App>
  );
};

export default PostedAudio;

import App from "../App";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import RecordAudio from "../services/recordAudio";
import StopRecord from "../services/stopRecording";
import PlayAudio from "../services/playAudio";
import UploadRecord from "../services/uploadAudio";
import { useState } from "react";

const Recorder = () => {
  const cookies = new Cookies();
  const getAuthToken = () => {
    return cookies.get("authToken");
  };

  let authToken = getAuthToken();
  const navigate = useNavigate();
  const [uploadData, setUploadData] = useState("");
  const [fileName, setFileName] = useState("");

  const handleRecording = async () => {
    try {
      const recording = await RecordAudio(authToken);

      if (recording === 401) {
        navigate("/login");
      }
    } catch (error) {
      throw error;
    }
  };

  const handleStop = async () => {
    try {
      const stopper = await StopRecord(authToken);
      if (stopper === 401) {
        navigate("/login");
      }
    } catch (error) {
      throw error;
    }
  };

  const handlePlay = async () => {
    try {
      const player = await PlayAudio(authToken);
      if (player === 401) {
        navigate("/login");
      }
    } catch (error) {
      throw error;
    }
  };

  const handleUpload = async () => {
    try {
      if (!fileName) {
        alert("Please enter a filename");
        return;
      }

      const upload = await UploadRecord(authToken, fileName);
      if (upload === 401) {
        navigate("/login");
      }

      setUploadData(upload);
    } catch (error) {
      throw error;
    }
  };

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  return (
    <App>
      <div className="recorder-container">
        <div className="audio-spectrum">
          <div className="input-container">
            <p>File Name</p>
            <input
              type="text"
              className="record-name"
              value={fileName}
              onChange={handleFileNameChange}
            ></input>
          </div>
          <div className="upload-status">{uploadData}</div>
        </div>
        <div className="buttons-container">
          <div className="record">
            <button onClick={handleRecording}>
              <ion-icon name="mic-circle-outline"></ion-icon>
            </button>
            <p>Record</p>
          </div>
          <div className="stop">
            <button onClick={handleStop}>
              <ion-icon name="stop-circle-outline"></ion-icon>
            </button>
            <p>Stop</p>
          </div>
          <div className="play">
            <button onClick={handlePlay}>
              <ion-icon name="play-circle-outline"></ion-icon>
            </button>
            <p>Play</p>
          </div>
          <div className="upload">
            <button onClick={handleUpload}>
              <ion-icon name="arrow-up-circle-outline"></ion-icon>
            </button>
            <p>Upload</p>
          </div>
        </div>
      </div>
    </App>
  );
};

export default Recorder;

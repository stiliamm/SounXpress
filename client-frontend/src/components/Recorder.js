import App from "../App";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import RecordAudio from "../services/recordAudio";
import StopRecord from "../services/stopRecording";
import PlayAudio from "../services/playAudio";
import UploadRecord from "../services/uploadAudio";

const Recorder = () => {
  const cookies = new Cookies();
  const getAuthToken = () => {
    return cookies.get("authToken");
  };

  let authToken = getAuthToken();
  const navigate = useNavigate();

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
      const upload = await UploadRecord(authToken);
      if (upload === 401) {
        navigate("/login");
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <App>
      <div className="recorder-container">
        <div className="audio-spectrum">AUDIO SPECTRUM</div>
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

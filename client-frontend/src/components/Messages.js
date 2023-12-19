import App from "../App";
import Conversation from "./Conversation";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import SendMessage from "../services/sendMessage";
import { useState } from "react";

const Messages = () => {
  const cookies = new Cookies();
  const getAuthToken = () => {
    return cookies.get("authToken");
  };

  let authToken = getAuthToken();
  const navigate = useNavigate();
  const { username } = useParams();
  const [messageData, setMessageData] = useState("");
  const [refreshConvoData, setRefreshConvoData] = useState(false);

  const handleSendMessage = async () => {
    try {
      const sendOperation = await SendMessage(authToken, username, messageData);

      if (sendOperation === 401) {
        navigate("/login");
      }

      setMessageData("");
      setRefreshConvoData((prev) => !prev);
    } catch (error) {
      throw error;
    }
  };

  return (
    <App>
      <div className="msg-container">
        <header className="msg-header">
          <span className="user">{username}</span>
        </header>
        <Conversation
          authToken={authToken}
          receiverUsername={username}
          refreshConvoData={refreshConvoData}
        />
        <div className="input-area">
          <textarea
            value={messageData}
            onChange={(e) => setMessageData(e.target.value)}
          ></textarea>
          <button
            onClick={handleSendMessage}
            className="send-button"
            disabled={!messageData.trim()}
          >
            <ion-icon name="send-outline"></ion-icon>
          </button>
        </div>
      </div>
    </App>
  );
};
export default Messages;

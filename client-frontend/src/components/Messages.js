import App from "../App";
import Conversation from "./Conversation";
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";

const Messages = () => {
  const cookies = new Cookies();
  const getAuthToken = () => {
    return cookies.get("authToken");
  };

  let authToken = getAuthToken();
  const { username } = useParams();

  // ADD LOGIC FOR SENDING A MESSAGE

  return (
    <App>
      <div className="msg-container">
        <header className="msg-header">
          <span className="user">{username}</span>
        </header>
        <Conversation authToken={authToken} receiverUsername={username} />
        <div className="input-area">
          <textarea></textarea>
          <button className="send-button">
            <ion-icon name="send-outline"></ion-icon>
          </button>
        </div>
      </div>
    </App>
  );
};
export default Messages;

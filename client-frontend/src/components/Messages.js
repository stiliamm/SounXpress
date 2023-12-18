import App from "../App";
import Conversation from "./Conversation";

const Messages = () => {
  const cookies = new Cookies();
  const getAuthToken = () => {
    return cookies.get("authToken");
  };

  let authToken = getAuthToken();

  return (
    <App>
      <div className="msg-container">
        <header className="msg-header">
          <span className="user">Thorslam</span>
        </header>
        <Conversation authToken={authToken} />
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

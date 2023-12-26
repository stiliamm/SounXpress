import { useState, useEffect } from "react";
import getConversation from "../services/getConversation";
import { useNavigate } from "react-router-dom";

const Conversation = ({ authToken, receiverUsername, refreshConvoData }) => {
  const [convoData, setConvoData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getConvo = async () => {
      try {
        const convo = await getConversation(authToken, receiverUsername);
        console.log("Convo data", convo);
        if (convo === 401) {
          navigate("/login");
        }
        setConvoData(convo);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    getConvo();
  }, [authToken, receiverUsername, refreshConvoData, navigate]);

  return (
    <div className="text-box">
      {convoData &&
        convoData
          .slice()
          .reverse()
          .map((message) => (
            <>
              <div
                key={message.id}
                className={
                  message.sender === receiverUsername
                    ? "received-msg"
                    : "sent-msg"
                }
              >
                <text>{message.message}</text>
              </div>
              <p>{message.from_user}</p>
            </>
          ))}
    </div>
  );
};

export default Conversation;

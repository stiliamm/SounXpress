import { useState, useEffect } from "react";
import getConversation from "../services/getConversation";

const Conversation = ({ authToken, receiverUsername }) => {
  const [convoData, setConvoData] = useState(null);

  useEffect(() => {
    const getConvo = async () => {
      try {
        const convo = await getConversation(authToken, receiverUsername);
        console.log("Convo data", convo);
        setConvoData(convo);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    getConvo();
  }, [authToken, receiverUsername]);

  return (
    <div className="text-box">
      {convoData &&
        convoData.map((message, index) => (
          <div
            key={index}
            className={
              message.sender === receiverUsername ? "received-msg" : "sent-msg"
            }
          >
            <text>{message.message}</text>
          </div>
        ))}
    </div>
  );
};

export default Conversation;

import Cookies from "universal-cookie";
import App from "../App";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Contacts = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const getAuthToken = () => {
    return cookies.get("authToken");
  };

  let authToken = getAuthToken();

  const [contactsData, setContactsData] = useState([]);

  useEffect(() => {
    const getOpenConvos = async () => {
      try {
        const response = await fetch("http://localhost:8000/messages", {
          method: "GET",
          headers: {
            "x-token": authToken,
          },
        });

        if (response.status === 401) {
          navigate("/login");
        }

        if (!response.ok) {
          throw new Error("Network was not ok!");
        }

        const data = await response.json();
        setContactsData(data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    getOpenConvos();
  }, [authToken, navigate]);

  return (
    <App>
      <div className="contacts-container">
        {contactsData.map((contact, index) => (
          <div key={index} className="contact">
            <span>{contact.username}</span>
            <Link to={`/messages/conversation/${contact.username}`}>
              Message
            </Link>
          </div>
        ))}
        <div className="new-convo-container">
          <button className="new-convo">New Conversation</button>
        </div>
      </div>
    </App>
  );
};

export default Contacts;

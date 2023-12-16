import Cookies from "universal-cookie";
import App from "../App";
import { useState } from "react";
import GetToken from "../services/getToken";

const Profile = () => {
  let authToken = GetToken();
  const [avatarData, setAvatarData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const getAvatar = async () => {
    if (!authToken) {
      return;
    }

    const response = await fetch("http://localhost:8000/users/image", {
      method: "GET",
      headers: {
        "x-token": authToken,
      },
    });

    if (!response.ok) {
      throw new Error("Network was not ok!");
    }

    const photo = await response.blob();
    setAvatarData(photo);
  };

  const getUserInfo = async () => {
    if (!authToken) {
      return;
    }

    const response = await fetch("http://localhost:8000/users/info", {
      method: "GET",
      headers: {
        "x-token": authToken,
      },
    });

    if (!response.ok) {
      throw new Error("Network was not ok!");
    }

    const data = await response.json();
    setUserInfo(data);
  };

  return (
    <App>
      <div className="profile-container">
        <div className="content-avatar">
          <img href={getAvatar} className="avatar"></img>
        </div>
        <div className="metadata">
          <div className="fullname">
            <span className="firstName">John</span>
            <span className="lastName">Ivanov</span>
          </div>
        </div>
        <div className="user-data">
          <div className="username">
            <span>Username:</span>
            <span>Top Record:</span>
            <span>Recordings:</span>
            <span>
              Contact:
              <a href="/messages">send message</a>
            </span>
          </div>
        </div>
      </div>
    </App>
  );
};
export default Profile;

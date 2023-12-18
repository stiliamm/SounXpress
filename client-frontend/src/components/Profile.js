import App from "../App";
import { useEffect, useState } from "react";
import getAvatar from "../services/getAvatar";
import getUserInfo from "../services/getUserInfo";
import Cookies from "universal-cookie";

const Profile = () => {
  const cookies = new Cookies();
  const getAuthToken = () => {
    return cookies.get("authToken");
  };

  let authToken = getAuthToken();
  const [avatarData, setAvatarData] = useState({});
  const [userInfo, setUserInfo] = useState(null);

  console.log("Token", authToken);

  useEffect(() => {
    const fetchAvatarAndUserInfo = async () => {
      try {
        const avatar = await getAvatar(authToken);
        const info = await getUserInfo(authToken);

        if (!avatar) {
          setAvatarData({});
        } else {
          setAvatarData(URL.createObjectURL(avatar));
        }

        setUserInfo(info);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchAvatarAndUserInfo();
  }, [authToken]);

  return (
    <App>
      <div className="profile-container">
        <div className="content-avatar">
          {avatarData && (
            <img
              src={avatarData}
              alt="Avatar"
              className="avatar"
              key={authToken}
            />
          )}
        </div>
        {userInfo && (
          <div>
            <div className="metadata">
              <div className="fullname">
                <span className="firstName">{userInfo.first_name}</span>
                <span className="lastName">{userInfo.last_name}</span>
              </div>
            </div>
            <div className="user-data">
              <span>Username {userInfo.username}</span>
              <span>Top Record:</span>
              <span>Recordings: {userInfo.recordings}</span>
              <span>
                Contact:
                <a href="/messages">send message</a>
              </span>
            </div>
          </div>
        )}
      </div>
    </App>
  );
};
export default Profile;

import Cookies from "universal-cookie";

const GetToken = () => {
  const cookies = new Cookies();
  const getAuthToken = () => {
    return cookies.get("authToken");
  };
  let authToken = getAuthToken();
  return authToken;
};
export default GetToken;

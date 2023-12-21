import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Cookies from "universal-cookie";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  redirect,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import PostedAudio from "./components/PostedAudio";
import Messages from "./components/Messages";
import Contacts from "./components/ConvoList";
import Recorder from "./components/Recorder";

const cookies = new Cookies();
const getAuthToken = () => {
  return cookies.get("authToken");
};

const tokenLoader = () => {
  const authToken = getAuthToken();
  if (!authToken) {
    return redirect("/login");
  }
  return null;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} loader={tokenLoader}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/library" element={<PostedAudio />}></Route>
      <Route path="/profile" element={<Profile />} loader={tokenLoader}></Route>
      <Route
        path={`/messages/conversation/:username`}
        element={<Messages />}
        loader={tokenLoader}
      ></Route>
      <Route
        path="/messages"
        element={<Contacts />}
        loader={tokenLoader}
      ></Route>
      <Route
        path="/recorder"
        element={<Recorder />}
        loader={tokenLoader}
      ></Route>
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

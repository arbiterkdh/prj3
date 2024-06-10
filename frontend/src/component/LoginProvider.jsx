import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const LoginContext = createContext(null);

export function LoginProvider({ children }) {
  const [id, setId] = useState("");
  const [expired, setExpired] = useState(0);
  const [nickName, setNickName] = useState("");
  const [picture, setPicture] = useState("");
  const [email, setEmail] = useState("");
  const kakaoKey = import.meta.env.VITE_KAKAO_APP_KEY;
  const kakaoUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      return;
    }
    login(token);
  }, []);

  function isLoggedIn() {
    return Date.now() < expired * 1000;
  }

  function hasAccess(param) {
    return id == param;
  }

  function login(token) {
    localStorage.setItem("token", token);
    const payload = jwtDecode(token);
    setExpired(payload.exp);
    setId(payload.sub);
    setNickName(payload.nickname);
    setPicture(payload.picture);
    setEmail(payload.email);
  }

  function logout() {
    localStorage.removeItem("token");
    setId("");
    setExpired(0);
    setNickName("");
    setPicture("");
    setEmail("");
  }

  function kakaoLogin(token) {
    const payload = jwtDecode(token);
    localStorage.setItem("token", token);
    axios
      .post("/api/member/check", {
        email: payload.email,
      })
      .then((res) => {
        axios.post("/api/member/signup", {
          email: payload.email,
          nickName: payload.nickname,
          picture: payload.picture,
        });
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status === 409) {
          login(token);
        }
      })
      .finally();
    setExpired(payload.exp);
    setId(payload.sub);
    setNickName(payload.nickname);
    setPicture(payload.picture);
    setEmail(payload.email);
  }

  return (
    <LoginContext.Provider
      value={{
        kakaoKey,
        kakaoUri,
        id,
        nickName,
        picture,
        email,
        login,
        logout,
        hasAccess,
        isLoggedIn,
        kakaoLogin,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

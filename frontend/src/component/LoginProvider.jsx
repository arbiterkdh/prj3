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

  // 카카오 기능들 모음 //
  const kakaoKey = import.meta.env.VITE_KAKAO_APP_KEY;
  const kakaoUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const kakaoLogoutUri = "http://localhost:5173/oauth/kakao/logout";
  const [isKakaoLoggedIn, setIsKakaoLoggedIn] = useState(false);
  function kakaoInfo(id_token) {
    const payload = jwtDecode(id_token);
    setPicture(payload.picture);
    setNickName(payload.nickname);
  }
  // 카카오 기능들 모음 //

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      login(token);
    }
  }, []);

  function isLoggedIn() {
    const kakaoExpiresIn = localStorage.getItem("expires_in");
    if (kakaoExpiresIn) {
      return Date.now() < kakaoExpiresIn;
    }
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
    setNickName(payload.nickName);
    setPicture(payload.picture);
    setEmail(payload.email);
  }

  function logout() {
    if (isKakaoLoggedIn) {
      axios
        .get(
          `https://kauth.kakao.com/oauth/logout?client_id=${kakaoKey}&logout_redirect_uri=${kakaoLogoutUri}`,
        )
        .then(() => {
          localStorage.removeItem("access_token");
          localStorage.removeItem("expires_in");
          setIsKakaoLoggedIn(false);
        });
    }

    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
    }
    setId("");
    setExpired(0);
    setNickName("");
    setPicture("");
    setEmail("");
  }

  return (
    <LoginContext.Provider
      value={{
        id,
        nickName,
        picture,
        email,
        login,
        logout,
        hasAccess,
        isLoggedIn,
        kakaoKey,
        kakaoUri,
        isKakaoLoggedIn,
        setIsKakaoLoggedIn,
        kakaoInfo,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

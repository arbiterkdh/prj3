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
  const [authority, setAuthority] = useState([]);

  // 카카오 기능들 모음 //
  const kakaoKey = import.meta.env.VITE_KAKAO_APP_KEY;
  const kakaoUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const kakaoLogoutUri = "http://3.34.98.7:8080/oauth/kakao/logout";
  const [isKakaoLoggedIn, setIsKakaoLoggedIn] = useState(false);

  function kakaoInfo(id_token) {
    const payload = jwtDecode(id_token);
    // axios
    //   .post("/api/member/kakao-signup", {
    //     id: payload.id,
    //     nickName: payload.nickname,
    //     picture: payload.picture,
    //     email: payload.email,
    //   })
    //   .then((res) => {});
    setPicture(payload.picture);
    setNickName(payload.nickname);
    setEmail(payload.email);
    setExpired(payload.exp);
  }

  // 카카오 기능들 모음 //

  useEffect(() => {
    if (!isLoggedIn()) {
      logout();
    }
    const token = localStorage.getItem("token");
    if (token) {
      login(token);
    }
  }, []);

  function isLoggedIn() {
    return Date.now() < expired * 1000;
  }

  function hasAccess(param) {
    return id == param;
  }

  function isAdmin() {
    return authority.includes("admin");
  }

  function login(token) {
    localStorage.setItem("token", token);
    const payload = jwtDecode(token);
    setExpired(payload.exp);
    setId(payload.sub);
    setNickName(payload.nickName);
    setPicture(payload.picture);
    setEmail(payload.email);
    setAuthority(payload.scope.split(" "));
  }

  function logout() {
    if (isKakaoLoggedIn) {
      axios
        .get(
          `https://kauth.kakao.com/oauth/logout?client_id=${kakaoKey}&logout_redirect_uri=${kakaoLogoutUri}`,
        )
        .then(() => {
          localStorage.removeItem("access_token");
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
    setAuthority([]);
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
        isAdmin,
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

import { useContext, useEffect } from "react";
import axios from "axios";
import { LoginContext } from "../../../component/LoginProvider.jsx";

export function KakaoRedirect() {
  const account = useContext(LoginContext);

  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    axios
      .post(
        `https://kauth.kakao.com/oauth/token?client_id=${account.kakaoKey}&redirect_uri=${account.kakaoUri}&code=${code}&grant_type=authorization_code`,
      )
      .then((res) => {
        const ACCESS_TOKEN = res.data.access_token;
        const REFRESH_TOKEN = res.data.refresh_token;
        account.kakaoLogin(ACCESS_TOKEN);
      });
  }, []);

  return null;
}

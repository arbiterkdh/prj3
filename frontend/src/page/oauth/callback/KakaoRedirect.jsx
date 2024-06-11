import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../component/LoginProvider.jsx";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function KakaoRedirect() {
  const account = useContext(LoginContext);
  const code = new URL(window.location.href).searchParams.get("code");
  const [kakaoAuth, setKakaoAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // axios.get(`/api/oauth/kakao/callback?code=${code}`);
    if (!kakaoAuth) {
      axios
        .post(
          "https://kauth.kakao.com/oauth/token",
          {
            grant_type: "authorization_code",
            client_id: `${account.kakaoKey}`,
            redirect_uri: `${account.kakaoUri}`,
            code,
          },
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          },
        )
        .then((res) => {
          localStorage.setItem("access_token", res.data.access_token);
          account.kakaoInfo(res.data.id_token);
          setKakaoAuth(true);
          account.setIsKakaoLoggedIn(true);
          navigate("/");
        });
    }
  }, [kakaoAuth]);

  return <Box></Box>;
}

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../../../component/LoginProvider.jsx";
import { Box } from "@chakra-ui/react";
import CursorBox from "../../../css/theme/component/box/CursorBox.jsx";

export function KakaoRedirect() {
  const account = useContext(LoginContext);
  const [info, setInfo] = useState({
    access_token: "",
    refresh_token: "",
    id_token: "",
    scope: "",
  });

  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    axios
      .post(
        `https://kauth.kakao.com/oauth/token?client_id=${account.kakaoKey}&redirect_uri=${account.kakaoUri}&code=${code}&grant_type=authorization_code`,
      )
      .then((res) => {
        setInfo({
          access_token: res.data.access_token,
          refresh_token: res.data.refresh_token,
          id_token: res.data.id_token,
          scope: res.data.scope,
        });
      });
  }, []);

  return (
    <Box>
      <CursorBox onClick={() => account.kakaoLogin(info.id_token)}>
        로그인
      </CursorBox>
    </Box>
  );
}

import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../component/LoginProvider.jsx";
import { Box } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export function KakaoRedirect() {
  const account = useContext(LoginContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [code, setCode] = useState(searchParams.get("code"));

  useEffect(() => {
    axios.post(
      "https://kauth.kakao.com/oauth/token",
      {
        grant_type: "authorization_code",
        client_id: `${account.kakaoKey}`,
        redirect_uri: `${account.kakaoUri}`,
        code,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      },
    );
  }, []);

  return <Box></Box>;
}

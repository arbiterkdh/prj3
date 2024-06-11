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
    axios
      .post(
        "https://kauth.kakao.com/oauth/token",
        new URLSearchParams({
          grant_type: "authorization_code",
          client_id: `${account.kakaoKey}`,
          redirect_uri: `${account.kakaoUri}`,
          code,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        },
      )
      .then((res) => {
        const accessToken = `Bearer ${res.data.access_token}`;
        account.kakaoLogin(res.data);
        axios
          .get("/api/oauth/user-info", {
            headers: {
              Authorization: accessToken,
            },
          })
          .then((res) => {
            console.log("data", res.data);
          })
          .catch((err) => {
            console.error("err", err);
          });
      });
  }, [code]);

  return <Box></Box>;
}

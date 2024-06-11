import { useContext, useEffect } from "react";
import { LoginContext } from "../../../component/LoginProvider.jsx";
import { Box } from "@chakra-ui/react";
import axios from "axios";

export function KakaoRedirect() {
  const account = useContext(LoginContext);
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    axios.get(`/api/oauth/kakao/callback?code=${code}`);
  }, []);

  return <Box></Box>;
}

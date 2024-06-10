import { useContext } from "react";
import { LoginContext } from "../../../component/LoginProvider.jsx";
import { Box } from "@chakra-ui/react";

export function KakaoRedirect() {
  const account = useContext(LoginContext);

  return <Box></Box>;
}

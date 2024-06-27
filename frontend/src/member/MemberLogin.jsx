import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { LoginModal } from "../component/LoginModal.jsx";

export function MemberLogin() {
  const [isNeedLogin, setIsNeedLogin] = useState(false);

  return (
    <Box>
      <Box onClick={() => setIsNeedLogin(true)}>로그인</Box>
      <LoginModal
        isNeedLogin={isNeedLogin}
        setIsNeedLogin={setIsNeedLogin}
        isBookComponent={false}
      />
    </Box>
  );
}

import {
  Box,
  Center,
  Flex,
  Heading,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import GapFlex from "../css/theme/component/flex/GapFlex.jsx";
import { MemberLogin } from "../member/MemberLogin.jsx";
import CursorBox from "../css/theme/component/box/CursorBox.jsx";
import { useContext } from "react";
import { LoginContext } from "./LoginProvider.jsx";

export function Navbar() {
  const account = useContext(LoginContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();

  function handleLogout() {
    account.logout();
    navigate("/");
    toast({
      status: "info",
      description: "로그아웃되었습니다.",
      position: "bottom-right",
    });
  }

  return (
    <Center border={"1px solid black"}>
      <Box w={"1000px"}>
        <GapFlex justifyContent={"space-between"} width={"100%"}>
          <CursorBox>고객센터</CursorBox>
          <GapFlex>
            {account.isLoggedIn() && (
              <CursorBox onClick={handleLogout}>로그아웃</CursorBox>
            )}
            {account.isLoggedIn() || (
              <Flex>
                <CursorBox>
                  <MemberLogin />
                </CursorBox>
                <CursorBox onClick={() => navigate("/signup")}>
                  회원가입
                </CursorBox>
              </Flex>
            )}
          </GapFlex>
        </GapFlex>
        <Heading mt={5}>
          <Center>
            <CursorBox
              position={"absolute"}
              top={0}
              onClick={() => navigate("/")}
            >
              CCV
            </CursorBox>
          </Center>
          <GapFlex justifyContent="space-between">
            <GapFlex>
              <CursorBox onClick={() => navigate("/movie")}>영화</CursorBox>
              <CursorBox onClick={() => navigate("/theater")}>극장</CursorBox>
              <CursorBox onClick={() => navigate("/book")}>예매</CursorBox>
            </GapFlex>
            <GapFlex>
              <CursorBox onClick={() => navigate("/store")}>스토어</CursorBox>
              <CursorBox onClick={() => navigate("/promotion")}>
                이벤트
              </CursorBox>
            </GapFlex>
          </GapFlex>
        </Heading>
      </Box>
    </Center>
  );
}

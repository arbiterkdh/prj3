import {
  Box,
  Center,
  Flex,
  Heading,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import GapFlex from "../../css/theme/component/flex/GapFlex.jsx";
import { MemberLogin } from "../../member/MemberLogin.jsx";
import CursorBox from "../../css/theme/component/box/CursorBox.jsx";
import { useContext, useState } from "react";
import { LoginContext } from "../LoginProvider.jsx";
import { MovieDrawer } from "./drawer/MovieDrawer.jsx";
import { BookDrawer } from "./drawer/BookDrawer.jsx";
import { TheaterDrawer } from "./drawer/TheaterDrawer.jsx";
import { PromoDrawer } from "./drawer/PromoDrawer.jsx";

export function Navbar() {
  const account = useContext(LoginContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();
  const [drawer, setDrawer] = useState(0);

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
    <Box>
      <Center>
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
                <CursorBox
                  h={"100%"}
                  onMouseEnter={() => setDrawer(1)}
                  onMouseLeave={() => setDrawer(0)}
                  onClick={() => navigate("/movie")}
                >
                  영화
                </CursorBox>
                <CursorBox
                  h={"100%"}
                  onMouseEnter={() => setDrawer(2)}
                  onMouseLeave={() => setDrawer(0)}
                  onClick={() => navigate("/theater")}
                >
                  극장
                </CursorBox>
                <CursorBox
                  h={"100%"}
                  onMouseEnter={() => setDrawer(3)}
                  onMouseLeave={() => setDrawer(0)}
                  onClick={() => navigate("/book")}
                >
                  예매
                </CursorBox>
              </GapFlex>
              <GapFlex>
                <CursorBox onClick={() => navigate("/store")}>스토어</CursorBox>
                <CursorBox
                  h={"100%"}
                  onMouseEnter={() => setDrawer(4)}
                  onMouseLeave={() => setDrawer(0)}
                  onClick={() => navigate("/promotion")}
                >
                  이벤트
                </CursorBox>
              </GapFlex>
            </GapFlex>
          </Heading>
        </Box>
      </Center>
      <Center border={"1px solid black"}>
        <Box w={"1000px"}>
          {drawer === 1 && <MovieDrawer setDrawer={setDrawer} />}
          {drawer === 2 && <BookDrawer setDrawer={setDrawer} />}
          {drawer === 3 && <TheaterDrawer setDrawer={setDrawer} />}
          {drawer === 4 && <PromoDrawer setDrawer={setDrawer} />}
        </Box>
      </Center>
    </Box>
  );
}

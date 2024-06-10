import { Box, Center, Flex, Heading, Image, useToast } from "@chakra-ui/react";
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
import NavBox from "../../css/theme/component/box/NavBox.jsx";

export function Navbar() {
  const account = useContext(LoginContext);
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
      <Center borderBottom={"1px solid black"}>
        <Box w={"1000px"}>
          <GapFlex justifyContent={"space-between"} width={"100%"}>
            <CursorBox>고객센터</CursorBox>
            <GapFlex>
              {account.isLoggedIn() && (
                <Flex>
                  <Image alt={"profile"} src={account.picture} />
                  <CursorBox>{account.nickName}님</CursorBox>
                  <CursorBox onClick={handleLogout}>로그아웃</CursorBox>
                </Flex>
              )}
              {account.isLoggedIn() || (
                <Flex>
                  <CursorBox>
                    <MemberLogin />
                  </CursorBox>
                  <CursorBox onClick={() => navigate("/verify")}>
                    회원가입
                  </CursorBox>
                </Flex>
              )}
            </GapFlex>
          </GapFlex>
          <Heading mt={5}>
            <Center>
              <NavBox
                position={"absolute"}
                top={0}
                onClick={() => navigate("/")}
              >
                CCV
              </NavBox>
            </Center>
            <GapFlex mb={-3} justifyContent="space-between">
              <GapFlex>
                <NavBox
                  onMouseEnter={() => setDrawer(1)}
                  onMouseLeave={() => setDrawer(0)}
                  onClick={() => navigate("/movie")}
                >
                  영화
                </NavBox>
                <NavBox
                  onMouseEnter={() => setDrawer(2)}
                  onMouseLeave={() => setDrawer(0)}
                  onClick={() => navigate("/theater")}
                >
                  극장
                </NavBox>
                <NavBox
                  onMouseEnter={() => setDrawer(3)}
                  onMouseLeave={() => setDrawer(0)}
                  onClick={() => navigate("/book")}
                >
                  예매
                </NavBox>
              </GapFlex>
              <GapFlex>
                <NavBox onClick={() => navigate("/store")}>스토어</NavBox>
                <NavBox
                  onMouseEnter={() => setDrawer(4)}
                  onMouseLeave={() => setDrawer(0)}
                  onClick={() => navigate("/promotion")}
                >
                  이벤트
                </NavBox>
              </GapFlex>
            </GapFlex>
          </Heading>
        </Box>
      </Center>
      <Center>
        <Box w={"100%"}>
          {drawer === 0 && <Box h={"33px"} />}
          {drawer === 1 && <MovieDrawer setDrawer={setDrawer} />}
          {drawer === 2 && <BookDrawer setDrawer={setDrawer} />}
          {drawer === 3 && <TheaterDrawer setDrawer={setDrawer} />}
          {drawer === 4 && <PromoDrawer setDrawer={setDrawer} />}
        </Box>
      </Center>
    </Box>
  );
}

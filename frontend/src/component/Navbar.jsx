import { Box, Center, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import GapFlex from "../css/theme/component/flex/GapFlex.jsx";
import { LoginModalComponent } from "./LoginModalComponent.jsx";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <Box border={"1px solid black"}>
      <GapFlex
        position={"absolute"}
        justifyContent={"space-between"}
        width={"100%"}
      >
        <Box>고객센터</Box>
        <GapFlex>
          <Box>
            <LoginModalComponent />
          </Box>
          <Box>회원가입</Box>
        </GapFlex>
      </GapFlex>
      <Heading mt={5}>
        <Center>
          <Box
            position={"absolute"}
            top={0}
            onClick={() => navigate("/")}
            cursor={"pointer"}
          >
            CCV
          </Box>
        </Center>
        <GapFlex justifyContent="space-between">
          <GapFlex>
            <Box onClick={() => navigate("/movie")} cursor={"pointer"}>
              영화
            </Box>
            <Box onClick={() => navigate("/theater")} cursor={"pointer"}>
              극장
            </Box>
            <Box onClick={() => navigate("/book")} cursor={"pointer"}>
              예매
            </Box>
          </GapFlex>
          <GapFlex>
            <Box onClick={() => navigate("/store")} cursor={"pointer"}>
              스토어
            </Box>
            <Box onClick={() => navigate("/promotion")} cursor={"pointer"}>
              이벤트
            </Box>
          </GapFlex>
        </GapFlex>
      </Heading>
    </Box>
  );
}

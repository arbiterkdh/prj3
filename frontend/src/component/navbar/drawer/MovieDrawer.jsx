import GapFlex from "../../../css/theme/component/flex/GapFlex.jsx";
import CursorBox from "../../../css/theme/component/box/CursorBox.jsx";
import DrawerBorderBox from "../../../css/theme/component/box/DrawerBorderBox.jsx";
import { Box, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function MovieDrawer({ setDrawer }) {
  const navigate = useNavigate();
  return (
    <DrawerBorderBox
      onMouseEnter={() => setDrawer(1)}
      onMouseLeave={() => setDrawer(0)}
    >
      <Center>
        <Box w={"1000px"}>
          <GapFlex>
            <CursorBox
              onClick={() => {
                navigate("/movie");
              }}
            >
              전체영화
            </CursorBox>
            <CursorBox>무비포스트</CursorBox>
          </GapFlex>
        </Box>
      </Center>
    </DrawerBorderBox>
  );
}

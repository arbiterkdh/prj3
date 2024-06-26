import GapFlex from "../../../css/theme/component/flex/GapFlex.jsx";
import CursorBox from "../../../css/theme/component/box/CursorBox.jsx";
import DrawerBorderBox from "../../../css/theme/component/box/DrawerBorderBox.jsx";
import { Box, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function TheaterDrawer({ setDrawer }) {
  const navigate = useNavigate();

  return (
    <DrawerBorderBox
      onMouseEnter={() => setDrawer(2)}
      onMouseLeave={() => setDrawer(0)}
    >
      <Center>
        <Box w={"1000px"}>
          <GapFlex>
            <CursorBox onClick={() => navigate("/theater")}>전체극장</CursorBox>
            <CursorBox>특별관</CursorBox>
          </GapFlex>
        </Box>
      </Center>
    </DrawerBorderBox>
  );
}

import CursorBox from "../../../css/theme/component/box/CursorBox.jsx";
import GapFlex from "../../../css/theme/component/flex/GapFlex.jsx";
import DrawerBorderBox from "../../../css/theme/component/box/DrawerBorderBox.jsx";
import { Box, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function BookDrawer({ setDrawer }) {
  const navigate = useNavigate();
  return (
    <DrawerBorderBox
      onMouseEnter={() => setDrawer(3)}
      onMouseLeave={() => setDrawer(0)}
    >
      <Center>
        <Box w={"1000px"}>
          <GapFlex>
            <CursorBox onClick={() => navigate("/book")}>빠른예매</CursorBox>
            <CursorBox>상영시간표</CursorBox>
            <CursorBox>더 부티크 프라이빗 예매</CursorBox>
          </GapFlex>
        </Box>
      </Center>
    </DrawerBorderBox>
  );
}

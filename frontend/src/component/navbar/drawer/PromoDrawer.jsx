import CursorBox from "../../../css/theme/component/box/CursorBox.jsx";
import GapFlex from "../../../css/theme/component/flex/GapFlex.jsx";
import DrawerBorderBox from "../../../css/theme/component/box/DrawerBorderBox.jsx";
import { Box, Center } from "@chakra-ui/react";

export function PromoDrawer({ setDrawer }) {
  return (
    <DrawerBorderBox
      onMouseEnter={() => setDrawer(4)}
      onMouseLeave={() => setDrawer(0)}
    >
      <Center>
        <Box w={"1000px"}>
          <GapFlex justifyContent={"right"}>
            <CursorBox>진행중 이벤트</CursorBox>
            <CursorBox>지난 이벤트</CursorBox>
            <CursorBox>당첨자 발표</CursorBox>
          </GapFlex>
        </Box>
      </Center>
    </DrawerBorderBox>
  );
}

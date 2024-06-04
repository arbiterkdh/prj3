import { Box } from "@chakra-ui/react";
import CursorBox from "../../css/theme/component/box/CursorBox.jsx";
import GapFlex from "../../css/theme/component/flex/GapFlex.jsx";

export function PromoDrawer({ setDrawer }) {
  return (
    <Box onMouseEnter={() => setDrawer(4)} onMouseLeave={() => setDrawer(0)}>
      <GapFlex justifyContent={"right"}>
        <CursorBox>진행중 이벤트</CursorBox>
        <CursorBox>지난 이벤트</CursorBox>
        <CursorBox>당첨자 발표</CursorBox>
      </GapFlex>
    </Box>
  );
}

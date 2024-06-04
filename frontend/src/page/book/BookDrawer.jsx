import GapFlex from "../../css/theme/component/flex/GapFlex.jsx";
import CursorBox from "../../css/theme/component/box/CursorBox.jsx";
import { Box } from "@chakra-ui/react";

export function BookDrawer({ setDrawer }) {
  return (
    <Box onMouseEnter={() => setDrawer(2)} onMouseLeave={() => setDrawer(0)}>
      <GapFlex>
        <CursorBox>빠른예매</CursorBox>
        <CursorBox>상영시간표</CursorBox>
        <CursorBox>더 부티크 프라이빗 예매</CursorBox>
      </GapFlex>
    </Box>
  );
}

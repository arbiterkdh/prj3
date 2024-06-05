import GapFlex from "../../../css/theme/component/flex/GapFlex.jsx";
import CursorBox from "../../../css/theme/component/box/CursorBox.jsx";
import { Box } from "@chakra-ui/react";

export function TheaterDrawer({ setDrawer }) {
  return (
    <Box onMouseEnter={() => setDrawer(3)} onMouseLeave={() => setDrawer(0)}>
      <GapFlex>
        <CursorBox>전체극장</CursorBox>
        <CursorBox>특별관</CursorBox>
      </GapFlex>
    </Box>
  );
}

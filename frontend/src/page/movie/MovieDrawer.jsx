import GapFlex from "../../css/theme/component/flex/GapFlex.jsx";
import CursorBox from "../../css/theme/component/box/CursorBox.jsx";
import { Box } from "@chakra-ui/react";

export function MovieDrawer({ setDrawer }) {
  return (
    <Box>
      <Box onMouseEnter={() => setDrawer(1)} onMouseLeave={() => setDrawer(0)}>
        <GapFlex>
          <CursorBox>전체영화</CursorBox>
          <CursorBox>무비포스트</CursorBox>
        </GapFlex>
      </Box>
    </Box>
  );
}

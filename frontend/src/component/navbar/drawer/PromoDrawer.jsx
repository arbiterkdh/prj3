import CursorBox from "../../../css/theme/component/box/CursorBox.jsx";
import GapFlex from "../../../css/theme/component/flex/GapFlex.jsx";
import DrawerBorderBox from "../../../css/theme/component/box/DrawerBorderBox.jsx";
import { Box, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function PromoDrawer({ setDrawer }) {
  const navigate = useNavigate();

  return (
    <DrawerBorderBox
      onMouseEnter={() => setDrawer(4)}
      onMouseLeave={() => setDrawer(0)}
    >
      <Center>
        <Box w={"1000px"}>
          <GapFlex justifyContent={"right"}>
            <CursorBox onClick={() => navigate("/promotion/all")}>
              진행중 이벤트
            </CursorBox>
            <CursorBox onClick={() => navigate("/promotion/eventEnd")}>
              종료 이벤트
            </CursorBox>
            <CursorBox onClick={() => navigate(`/promotion/eventResult`)}>
              당첨자 발표
            </CursorBox>
          </GapFlex>
        </Box>
      </Center>
    </DrawerBorderBox>
  );
}

import CenterBox from "../../css/theme/component/box/CenterBox.jsx";
import { Box, Button, Center, Heading } from "@chakra-ui/react";
import DrawerBorderBox from "../../css/theme/component/box/DrawerBorderBox.jsx";
import PGridItem from "../../css/theme/component/grid/PGridItem.jsx";
import { useNavigate } from "react-router-dom";

export function PromoNavbar({ children }) {
  const navigate = useNavigate();

  return (
    <Center>
      <CenterBox>
        <Heading>EVENT</Heading>
        <DrawerBorderBox />
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box display="flex" gap={20} flexWrap="nowrap">
            <PGridItem onClick={() => navigate("/promotion/all")}>
              전체
            </PGridItem>
            <PGridItem onClick={() => navigate("/promotion/movie")}>
              영화
            </PGridItem>
            <PGridItem onClick={() => navigate("/promotion/theater")}>
              극장
            </PGridItem>
            <PGridItem onClick={() => navigate("/promotion/membership")}>
              멤버십
            </PGridItem>
            <PGridItem onClick={() => navigate("/promotion/discount")}>
              제휴/할인
            </PGridItem>
          </Box>
          <Box display="flex">
            <Button
              bg={"green"}
              color={"white"}
              _hover={{ bg: "darkred" }}
              onClick={() => navigate("/promotion/add")}
              size="sm"
            >
              새글작성
            </Button>
            <Button
              bg={"red"}
              color={"white"}
              _hover={{ bg: "darkred" }}
              onClick={() => navigate("/promotion/eventResult")}
              size="sm"
            >
              당첨자 발표
            </Button>
            <Button
              bg={"red"}
              color={"white"}
              _hover={{ bg: "darkred" }}
              onClick={() => navigate("/promotion/eventEnd")}
              size="sm"
            >
              종료된 이벤트
            </Button>
          </Box>
        </Box>
        <DrawerBorderBox
          style={{ borderBottom: "1px solid rgba(0,0,0,0.2)" }}
        />
        {children}
      </CenterBox>
    </Center>
  );
}

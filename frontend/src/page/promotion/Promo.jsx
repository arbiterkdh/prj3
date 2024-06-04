import { Box, Grid, Heading } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import PGridItem from "../../css/theme/component/grid/PGridItem.jsx";

export function Promo() {
  const navigate = useNavigate();

  return (
    <Box>
      <Heading>EVENT</Heading>
      <Grid templateColumns="repeat(6, 1fr)" gap={7}>
        <PGridItem onClick={() => navigate("/promotion")}>전체</PGridItem>
        <PGridItem>영화</PGridItem>
        <PGridItem>극장</PGridItem>
        <PGridItem>멤버십</PGridItem>
        <PGridItem>제휴/할인</PGridItem>
        <PGridItem onClick={() => navigate("/promotion/add")}>
          새글작성
        </PGridItem>
      </Grid>
      <Outlet />
    </Box>
  );
}

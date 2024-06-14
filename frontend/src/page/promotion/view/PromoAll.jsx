import { Box, Heading } from "@chakra-ui/react";
import { PromoList } from "../list/PromoList.jsx";

export function PromoAll() {
  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Heading style={{ whiteSpace: "nowrap" }} fontSize="25px">
          영화
        </Heading>
      </Box>
      <PromoList eventType={"영화"} />
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Heading style={{ whiteSpace: "nowrap" }} fontSize="25px">
          극장
        </Heading>
      </Box>
      <PromoList eventType={"극장"} />
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Heading style={{ whiteSpace: "nowrap" }} fontSize="25px">
          멤버십
        </Heading>
      </Box>
      <PromoList eventType={"멤버십"} />
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Heading style={{ whiteSpace: "nowrap" }} fontSize="25px">
          제휴/할인
        </Heading>
      </Box>
      <PromoList eventType={"제휴/할인"} />
    </Box>
  );
}

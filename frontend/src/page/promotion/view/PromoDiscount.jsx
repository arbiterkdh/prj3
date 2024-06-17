import { Box } from "@chakra-ui/react";
import { PromoList } from "../list/PromoList.jsx";

export function PromoDiscount() {
  return (
    <Box>
      <Box>
        <PromoList eventType={"제휴/할인"} />
      </Box>
    </Box>
  );
}

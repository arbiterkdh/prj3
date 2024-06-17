import { Box } from "@chakra-ui/react";
import { PromoList } from "../list/PromoList.jsx";

export function PromoMembership() {
  return (
    <Box>
      <Box>
        <PromoList eventType={"멤버십"} />
      </Box>
    </Box>
  );
}

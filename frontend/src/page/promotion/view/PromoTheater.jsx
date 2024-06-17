import { Box } from "@chakra-ui/react";
import { PromoList } from "../list/PromoList.jsx";

export function PromoTheater() {
  return (
    <Box>
      <Box>
        <PromoList eventType={"극장"} />
      </Box>
    </Box>
  );
}

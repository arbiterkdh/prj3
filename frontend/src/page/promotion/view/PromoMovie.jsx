import { Box } from "@chakra-ui/react";
import { PromoList } from "../list/PromoList.jsx";

export function PromoMovie() {
  return (
    <Box>
      <Box>
        <PromoList eventType={"영화"} />
      </Box>
    </Box>
  );
}

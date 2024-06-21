import { Box } from "@chakra-ui/react";
import { PromoList } from "../list/PromoList.jsx";
import { useSearchParams } from "react-router-dom";

export function PromoDiscount() {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || 1;

  return (
    <Box>
      <PromoList eventType={"discount"} page={currentPage} />
    </Box>
  );
}

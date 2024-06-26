import { Box } from "@chakra-ui/react";
import { PromoList } from "../../list/PromoList.jsx";
import { useSearchParams } from "react-router-dom";

export function PromoTheater() {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || 1;
  const searchKeyword = searchParams.get("search") || "";

  return (
    <Box>
      <PromoList
        eventType="theater"
        search={searchKeyword}
        page={currentPage}
        pageSize={12}
      />
    </Box>
  );
}

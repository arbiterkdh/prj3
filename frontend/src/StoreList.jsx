import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function StoreList() {
  const navigate = useNavigate();
  return (
    <Box>
      <h1>상품 리스트</h1>
      <Button onClick={() => navigate("/store/add")}>상품등록</Button>
    </Box>
  );
}

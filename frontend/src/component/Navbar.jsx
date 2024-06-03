import {Box} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <Box>
      <Box>CCV</Box>
      <Box>영화</Box>
      <Box>극장</Box>
      <Box>예매</Box>
      <Box>스토어</Box>
      <Box onClick={() => navigate("/promotion")}
      cursor={"pointer"}
      _hover={{
        bgColor: "grey.200",
      }}>이벤트</Box>
    </Box>
  );
}

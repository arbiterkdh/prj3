import { Box } from "@chakra-ui/react";

// 기본 gap 값을 설정한 커스텀 Flex 컴포넌트
const StoreMenuCursorBox = (props) => {
  return (
    <Box
      variant="solid"
      color={"black"}
      borderRadius={"10px"}
      _hover={{
        color: "whiteAlpha.900",
        fontWeight: "600",
        bgColor: "red.500",
      }}
      _dark={{
        bgColor: "#red.700",
        color: "white",
        _hover: {
          color: "whiteAlpha.900",
          bgColor: "red.800",
        },
      }}
      cursor={"pointer"}
      m={2}
      w={"25%"}
      {...props}
    />
  );
};

export default StoreMenuCursorBox;

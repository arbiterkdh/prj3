import { Box } from "@chakra-ui/react";

// 기본 gap 값을 설정한 커스텀 Flex 컴포넌트
const StoreMenuCursorBox = (props) => {
  return (
    <Box
      variant="solid"
      color={"black"}
      bgColor={"white"}
      _hover={{
        bgColor: "red.600",
        color: "white",
      }}
      _dark={{
        bgColor: "#1f3032",
        color: "white",
        _hover: {
          color: "whiteAlpha.900",
          bgColor: "red.600",
        },
      }}
      cursor={"pointer"}
      m={1}
      w={"25%"}
      {...props}
    />
  );
};

export default StoreMenuCursorBox;

import { Box } from "@chakra-ui/react";

// 기본 gap 값을 설정한 커스텀 Flex 컴포넌트
const StoreMenuCursorBox = (props) => {
  return (
    <Box
      cursor={"pointer"}
      m={1}
      w={"25%"}
      _hover={{
        bgColor: "green.200",
        color: "white",
      }}
      {...props}
    />
  );
};

export default StoreMenuCursorBox;

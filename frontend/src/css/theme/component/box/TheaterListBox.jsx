import { Box } from "@chakra-ui/react";

// 기본 gap 값을 설정한 커스텀 Flex 컴포넌트
const TheaterListBox = (props) => {
  return (
    <Box
      width={"120px"}
      height={"50px"}
      cursor={"pointer"}
      border={"1px solid black"}
      m={1}
      textAlign={"center"}
      alignContent={"center"}
      {...props}
    />
  );
};

export default TheaterListBox;

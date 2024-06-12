import { GridItem } from "@chakra-ui/react"; // 기본 gap 값을 설정한 커스텀 Flex 컴포넌트

// 기본 gap 값을 설정한 커스텀 Flex 컴포넌트
const PGridItem = (props) => {
  return (
    <GridItem
      w="100%"
      h="10"
      display="flex"
      alignItems="center"
      justifyContent="center"
      cursor={"pointer"}
      _hover={{ color: "red" }}
      style={{ whiteSpace: "nowrap" }}
      {...props}
    />
  );
};

export default PGridItem;

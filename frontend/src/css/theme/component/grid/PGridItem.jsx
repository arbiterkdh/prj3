import { GridItem } from "@chakra-ui/react";

// 기본 gap 값을 설정한 커스텀 Flex 컴포넌트
const PGridItem = (props) => {
  return <GridItem w="100%" h="10" cursor={"pointer"} {...props} />;
};

export default PGridItem;

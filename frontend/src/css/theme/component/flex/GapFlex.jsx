import { Flex } from "@chakra-ui/react";

// 기본 gap 값을 설정한 커스텀 Flex 컴포넌트
const GapFlex = (props) => {
  return <Flex gap="4" {...props} />;
};

export default GapFlex;

import { Box } from "@chakra-ui/react";

// 기본 gap 값을 설정한 커스텀 Flex 컴포넌트
const CenterBox = (props) => {
  return <Box width={"1000px"} mt={16} {...props} />;
};

export default CenterBox;

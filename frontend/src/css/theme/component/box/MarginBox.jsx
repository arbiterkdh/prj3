import { Box } from "@chakra-ui/react"; // 기본 gap 값을 설정한 커스텀 Flex 컴포넌트

// 기본 gap 값을 설정한 커스텀 Flex 컴포넌트
const MarginBox = (props) => {
  return <Box margin="1" {...props} />;
};

export default MarginBox;

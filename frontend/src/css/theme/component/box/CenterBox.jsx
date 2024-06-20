import { Box } from "@chakra-ui/react";

const CenterBox = (props) => {
  return (
    <Box
      width={"1024px"}
      my={10}
      p={6}
      alignItems={"center"}
      bgColor={"whiteAlpha.100"}
      {...props}
    />
  );
};

export default CenterBox;

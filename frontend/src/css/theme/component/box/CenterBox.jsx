import { Box } from "@chakra-ui/react";

const CenterBox = (props) => {
  return (
    <Box
      width={"1024px"}
      my={12}
      p={5}
      alignItems={"center"}
      bgColor={"whiteAlpha.100"}
      {...props}
    />
  );
};

export default CenterBox;

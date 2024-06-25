import { Box } from "@chakra-ui/react";

const CenterBox = (props) => {
  return (
    <Box
      width={"1024px"}
      my={12}
      p={5}
      alignItems={"center"}
      border={"1px solid #DFE5E5"}
      bgColor={"whiteAlpha.900"}
      _dark={{
        border: "1px solid #193635",
        bgColor: "whiteAlpha.100",
      }}
      {...props}
    />
  );
};

export default CenterBox;

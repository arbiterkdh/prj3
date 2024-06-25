import { Box } from "@chakra-ui/react";

const CenterBox = (props) => {
  return (
    <Box
      width={"1024px"}
      my={12}
      mb={"200px"}
      p={5}
      alignItems={"center"}
      border={"1px solid #DFE5E5"}
      bgColor={"whiteAlpha.900"}
      _dark={{
        border: "1px solid #193635",
        bgColor: "whiteAlpha.100",
      }}
      boxShadow="
        0 12px 24px rgba(0, 0, 0, 0.03),
        0 -12px 24px rgba(0, 0, 0, 0.03),
        12px 0 24px rgba(0, 0, 0, 0.03),
        -12px 0 24px rgba(0, 0, 0, 0.03),
        0 0 10px rgba(0, 0, 0, 0.03)
      "
      {...props}
    />
  );
};

export default CenterBox;

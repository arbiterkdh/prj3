import { Box } from "@chakra-ui/react";

const EmptySeatBox = (props) => {
  return (
    <Box
      w={"20px"}
      h={"10px"}
      m={"2px"}
      mt={"8px"}
      _hover={{ color: "darkslategray", _dark: { color: "red.800" } }}
      cursor={"pointer"}
      {...props}
    />
  );
};

export default EmptySeatBox;

import { Box } from "@chakra-ui/react";

const EmptySeatBox = (props) => {
  return (
    <Box
      w={"22px"}
      h={"17px"}
      m={"1px"}
      alignContent={"center"}
      _hover={{ color: "darkslategray", _dark: { color: "red.800" } }}
      {...props}
    />
  );
};

export default EmptySeatBox;

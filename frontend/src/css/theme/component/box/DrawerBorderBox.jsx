import { Box } from "@chakra-ui/react";

const DrawerBorderBox = (props) => {
  return (
    <Box
      h={"35px"}
      alignContent={"center"}
      color={"whiteAlpha.900"}
      bgColor={"#3E6969"}
      _dark={{ bgColor: "blackAlpha.600" }}
      {...props}
    />
  );
};

export default DrawerBorderBox;

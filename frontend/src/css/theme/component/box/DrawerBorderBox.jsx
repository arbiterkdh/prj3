import { Box } from "@chakra-ui/react";

const DrawerBorderBox = (props) => {
  return (
    <Box
      h={"35px"}
      fontWeight={"600"}
      color={"whiteAlpha.900"}
      bgColor={"darkslategray"}
      _dark={{ bgColor: "blackAlpha.700" }}
      {...props}
    />
  );
};

export default DrawerBorderBox;

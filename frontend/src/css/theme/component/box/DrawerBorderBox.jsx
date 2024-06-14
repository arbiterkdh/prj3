import { Box } from "@chakra-ui/react";

const DrawerBorderBox = (props) => {
  return (
    <Box
      fontWeight={"600"}
      borderBottom={"1px solid black"}
      color={"white"}
      bgColor={"blackAlpha.800"}
      {...props}
    />
  );
};

export default DrawerBorderBox;

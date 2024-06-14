import { Box } from "@chakra-ui/react";

const DrawerBorderBox = (props) => {
  return (
    <Box
      h={"33px"}
      fontWeight={"600"}
      borderBottom={"1px solid black"}
      color={"white"}
      bgColor={"darkslategray"}
      {...props}
    />
  );
};

export default DrawerBorderBox;

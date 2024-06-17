import { Box } from "@chakra-ui/react";

const DrawerBorderBox = (props) => {
  return (
    <Box
      h={"33px"}
      opacity={"0.9"}
      fontWeight={"600"}
      color={"white"}
      bgColor={"darkslategray"}
      {...props}
    />
  );
};

export default DrawerBorderBox;

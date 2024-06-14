import { Box } from "@chakra-ui/react";

const NavBox = (props) => {
  return (
    <Box
      cursor={"pointer"}
      m={1}
      w={"80px"}
      h={"60px"}
      lineHeight={"50px"}
      align={"center"}
      {...props}
    />
  );
};

export default NavBox;

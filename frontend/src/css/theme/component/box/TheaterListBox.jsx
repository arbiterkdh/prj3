import { Box } from "@chakra-ui/react";

const TheaterListBox = (props) => {
  return (
    <Box
      width={"120px"}
      height={"50px"}
      cursor={"pointer"}
      textAlign={"center"}
      alignContent={"center"}
      {...props}
    />
  );
};

export default TheaterListBox;

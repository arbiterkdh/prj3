import { Box } from "@chakra-ui/react";

const TheaterListBox = (props) => {
  return (
    <Box
      width={"120px"}
      height={"50px"}
      cursor={"pointer"}
      border={"1px solid black"}
      m={1}
      textAlign={"center"}
      alignContent={"center"}
      {...props}
    />
  );
};

export default TheaterListBox;

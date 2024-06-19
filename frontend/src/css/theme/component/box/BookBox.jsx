import { Box } from "@chakra-ui/react";

const BookBox = (props) => {
  return (
    <Box
      border={"1px solid"}
      fontSize={"lg"}
      w={"100%"}
      h={"50px"}
      alignItems={"center"}
      justifyContent={"center"}
      display={"flex"}
      {...props}
    />
  );
};

export default BookBox;

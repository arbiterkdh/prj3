import { Box } from "@chakra-ui/react";

const BookTimeBox = (props) => {
  return (
    <Box
      border={"1px solid black"}
      fontSize={"lg"}
      w={"100%"}
      h={"100px"}
      alignItems={"center"}
      justifyContent={"center"}
      display={"flex"}
      {...props}
    />
  );
};

export default BookTimeBox;

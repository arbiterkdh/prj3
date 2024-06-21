import { Stack } from "@chakra-ui/react";

const OuterBookStack = (props) => {
  return (
    <Stack
      w={"100px"}
      h={"100%"}
      border={"1px solid"}
      justifyContent={"center"}
      alignItems={"center"}
      {...props}
    />
  );
};

export default OuterBookStack;

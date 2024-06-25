import { Stack } from "@chakra-ui/react";

const OuterBookStack = (props) => {
  return (
    <Stack
      w={"100px"}
      h={"100%"}
      borderY={"1px solid"}
      borderRight={"1px solid"}
      justifyContent={"center"}
      alignItems={"center"}
      {...props}
    />
  );
};

export default OuterBookStack;

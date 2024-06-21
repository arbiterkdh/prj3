import { Select } from "@chakra-ui/react";

const BorderSelect = (props) => {
  return (
    <Select
      borderRadius={"none"}
      m={1}
      border={"1px solid"}
      sx={{ _focus: { border: "2px solid gray" } }}
      {...props}
    />
  );
};

export default BorderSelect;

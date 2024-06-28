import { Tab } from "@chakra-ui/react";

const TheaterTab = (props) => {
  return (
    <Tab
      fontSize={"sm"}
      _selected={{
        color: "",
      }}
      _hover={{
        color: "red.400",
        borderBottomColor: "red.400",
        fontWeight: "bold",
      }}
      _active={{ bgColor: "" }}
      {...props}
    />
  );
};

export default TheaterTab;

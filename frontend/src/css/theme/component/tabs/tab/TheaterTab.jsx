import { Tab } from "@chakra-ui/react";

const TheaterTab = (props) => {
  return (
    <Tab
      fontSize={"sm"}
      _selected={{
        color: "",
      }}
      _active={{ bgColor: "" }}
      {...props}
    />
  );
};

export default TheaterTab;

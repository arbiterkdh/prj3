import { Tab } from "@chakra-ui/react";

const TheaterTab2 = (props) => {
  return (
    <Tab
      fontSize={"sm"}
      color={"gray"}
      _selected={{
        color: "darkslategray",
        fontWeight: "bold",
        bgColor: "whiteAlpha.900",
        border: "1px solid lightgray",
        borderBottom: "1px solid white",
      }}
      _dark={{
        _selected: {
          color: "white",
          border: "1px solid lightgray",
          bgColor: "#1F3032",
          borderBottom: "1px solid #1F3032",
        },
      }}
      {...props}
    />
  );
};

export default TheaterTab2;

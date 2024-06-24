import { Tab } from "@chakra-ui/react";

const TheaterTab2 = (props) => {
  return (
    <Tab
      fontSize={"sm"}
      color={"gray"}
      _selected={{
        color: "darkslategray",
        fontWeight: "bold",
        border: "1px solid lightgray",
        borderBottom: "1px solid white",
      }}
      _dark={{
        _selected: {
          color: "white",
          border: "1px solid lightgray",
          borderBottom: "1px solid #112325",
        },
      }}
      {...props}
    />
  );
};

export default TheaterTab2;

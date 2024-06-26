import { TabPanel } from "@chakra-ui/react";

const TheaterTabPanel = (props) => {
  return (
    <TabPanel
      h={"1200px"}
      bgColor={"whiteAlpha.900"}
      boxShadow="
        0 12px 24px rgba(0, 0, 0, 0.03),
        0 -12px 24px rgba(0, 0, 0, 0.03),
        12px 0 24px rgba(0, 0, 0, 0.03),
        -12px 0 24px rgba(0, 0, 0, 0.03),
        0 0 10px rgba(0, 0, 0, 0.03)
      "
      border={"1px solid lightgray"}
      _dark={{ border: "1px solid lightgray", bgColor: "whiteAlpha.100" }}
      mt={"-17px"}
      mb={"100px"}
      {...props}
    />
  );
};

export default TheaterTabPanel;

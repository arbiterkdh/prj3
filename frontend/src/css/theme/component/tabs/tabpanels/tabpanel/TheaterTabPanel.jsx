import { TabPanel } from "@chakra-ui/react";

const TheaterTabPanel = (props) => {
  return (
    <TabPanel
      h={"1200px"}
      border={"1px solid lightgray"}
      mt={"-17px"}
      mb={"100px"}
      {...props}
    />
  );
};

export default TheaterTabPanel;

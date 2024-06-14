import { Center, Heading, Text } from "@chakra-ui/react";
import CenterBox from "../../../css/theme/component/box/CenterBox.jsx";
import DrawerBorderBox from "../../../css/theme/component/box/DrawerBorderBox.jsx";

export function PromoUpcoming() {
  return (
    <Center>
      <CenterBox>
        <Heading>예정된 이벤트</Heading>
        <Text></Text>
        <DrawerBorderBox />
      </CenterBox>
    </Center>
  );
}

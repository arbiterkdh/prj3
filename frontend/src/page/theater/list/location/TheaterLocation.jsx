import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  TabList,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import TheaterTabPanel from "../../../../css/theme/component/tabs/tabpanels/tabpanel/TheaterTabPanel.jsx";
import AngledButton from "../../../../css/theme/component/button/AngledButton.jsx";
import TheaterTab from "../../../../css/theme/component/tabs/tab/TheaterTab.jsx";
import TheaterTab2 from "../../../../css/theme/component/tabs/tab/TheaterTab2.jsx";

export function TheaterLocation() {
  const location = useLocation();
  const [theaterNumber, setTheaterNumber] = useState(
    location.state.theaterNumber,
  );
  const [theaterLocation, setTheaterLocation] = useState(
    location.state.theaterLocation,
  );

  return (
    <Center>
      <Box w={"100%"} justifyContent={"center"} align={"center"}>
        <Image
          w={"inherit"}
          position={"absolute"}
          h={"165px"}
          zIndex={-1}
          src={
            "https://myawsbucket-arbiterkdh.s3.ap-northeast-2.amazonaws.com/prj3/theater/main/theatermain.jpg"
          }
        />
        <Stack w={"100%"} align={"center"}>
          <Tabs isFitted w={"1000px"}>
            <TabList color={"whiteAlpha.900"} mt={"35px"}>
              <TheaterTab>서울</TheaterTab>
              <TheaterTab>경기</TheaterTab>
              <TheaterTab>인천</TheaterTab>
              <TheaterTab>대전,충청,세종</TheaterTab>
              <TheaterTab>부산,대구,경상</TheaterTab>
              <TheaterTab>광주,전라</TheaterTab>
              <TheaterTab>강원</TheaterTab>
              <TheaterTab>제주</TheaterTab>
            </TabList>
          </Tabs>
          <Flex justifyContent="space-between" w={"1000px"} mt={"30px"}>
            <Box w={"30%"}></Box>
            <Box>
              <Heading textAlign={"center"} color={"white"}>
                {theaterLocation}
              </Heading>
            </Box>
            <Box w={"30%"}>
              <AngledButton>극장 정보 삽입</AngledButton>
              <AngledButton>극장 정보 수정</AngledButton>
            </Box>
          </Flex>
        </Stack>
        <Tabs isFitted variant="enclosed" w={"1000px"}>
          <TabList mb="1em">
            <TheaterTab2>극장정보</TheaterTab2>
            <TheaterTab2>상영시간표</TheaterTab2>
            <TheaterTab2>관람료</TheaterTab2>
          </TabList>
          <TabPanels align={"left"}>
            <TheaterTabPanel>극장정보</TheaterTabPanel>
            <TheaterTabPanel>상영시간표</TheaterTabPanel>
            <TheaterTabPanel>관람료</TheaterTabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Center>
  );
}

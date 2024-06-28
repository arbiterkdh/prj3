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
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import TheaterTabPanel from "../../../../css/theme/component/tabs/tabpanels/tabpanel/TheaterTabPanel.jsx";
import AngledButton from "../../../../css/theme/component/button/AngledButton.jsx";
import TheaterTab from "../../../../css/theme/component/tabs/tab/TheaterTab.jsx";
import TheaterTab2 from "../../../../css/theme/component/tabs/tab/TheaterTab2.jsx";
import axios from "axios";
import { LoginContext } from "../../../../component/LoginProvider.jsx";

export function TheaterLocation() {
  const account = useContext(LoginContext);

  const { number } = useParams();
  const [theaterNumber, setTheaterNumber] = useState(number);
  const [theaterLocation, setTheaterLocation] = useState("");

  const [cityList, setCityList] = useState([]);

  const [mouseLocation, setMouseLocation] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/theater/city/location").then((res) => {
      setCityList(res.data);
    });
    axios
      .get(`/api/theater/location/${theaterNumber}`)
      .then((res) => setTheaterLocation(res.data.location));
  }, []);

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
              {cityList.length > 0 &&
                cityList.map((city, index) => {
                  return (
                    <TheaterTab
                      key={index}
                      onMouseEnter={() => setMouseLocation(index + 1)}
                      onMouseLeave={() => setMouseLocation(0)}
                    >
                      {city.city}
                    </TheaterTab>
                  );
                })}
            </TabList>
          </Tabs>
          <Flex justifyContent="space-between" w={"1000px"} mt={"30px"}>
            <Box w={"30%"} />
            <Box>
              <Heading textAlign={"center"} color={"white"}>
                {theaterLocation}
              </Heading>
            </Box>
            {account.isAdmin() ? (
              <Box w={"30%"}>
                <AngledButton>극장 정보 삽입</AngledButton>
                <AngledButton>극장 정보 수정</AngledButton>
              </Box>
            ) : (
              <Box w={"30%"} />
            )}
          </Flex>
          <Box position={"absolute"}>
            {cityList.map((city, index) => {
              let isSameIndex = mouseLocation === index + 1;
              return (
                <Box
                  key={index}
                  w={"1000px"}
                  position={"absolute"}
                  top={"65px"}
                  left={"-500px"}
                  zIndex={1}
                  onMouseEnter={() => setMouseLocation(index + 1)}
                  onMouseLeave={() => setMouseLocation(0)}
                >
                  <Flex
                    mt={"20px"}
                    color={"whiteAlpha.800"}
                    bgColor={"blackAlpha.900"}
                    display={isSameIndex ? "flex" : "none"}
                    flexWrap={"wrap"}
                  >
                    {isSameIndex &&
                      city.theaterList.map((theater, index) => {
                        return (
                          <Box
                            w={"25%"}
                            h={"35px"}
                            key={index}
                            onClick={() =>
                              navigate(`/theater/${theater.number}`)
                            }
                          >
                            {theater.location}
                          </Box>
                        );
                      })}
                  </Flex>
                </Box>
              );
            })}
          </Box>
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

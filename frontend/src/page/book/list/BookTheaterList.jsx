import { Box, Flex, Stack } from "@chakra-ui/react";
import CursorBox from "../../../css/theme/component/box/CursorBox.jsx";
import axios from "axios";
import { useEffect } from "react";

export function BookTheaterList({
  cityList,
  theaterNumberList,
  setTheaterNumberList,
  isCityChecked,
  setIsCityChecked,
  checkedTheaterNumber,
  setCheckedTheaterNumber,
  setTheaterBoxList,
}) {
  useEffect(() => {
    if (theaterNumberList.length === 0) {
      axios.get(`/api/theater/list`).then((res) => {
        setTheaterNumberList(res.data);
      });
    }
    setCheckedTheaterNumber(0);
    setTheaterBoxList([]);
  }, [isCityChecked]);

  function handleClick(city) {
    axios
      .get(`/api/theater/list?city=${city}`)
      .then((res) => {
        setTheaterNumberList(res.data);
      })
      .catch(() => {})
      .finally(() => {});
    setIsCityChecked("");
  }

  function handleClickTheater(theaterNumber) {
    axios.get(`/api/theaterbox/list/${theaterNumber}`).then((res) => {
      setTheaterBoxList(res.data);
    });
  }

  return (
    <Flex h={"100%"}>
      <Box
        borderTop={"1px solid"}
        borderLeft={"1px solid"}
        w={"80%"}
        h={"600px"}
      >
        <Stack gap={0}>
          {cityList.map((city) => {
            let isSameCity = city === isCityChecked;
            return (
              <CursorBox
                key={city}
                alignItems={"center"}
                w={"97%"}
                h={"50px"}
                alignContent={"center"}
                bgColor={isSameCity ? "blackAlpha.200" : ""}
                _hover={
                  isSameCity
                    ? {}
                    : {
                        bgColor: "blackAlpha.300",
                        _dark: { bgColor: "blackAlpha.400" },
                      }
                }
                _dark={isSameCity ? { bgColor: "blackAlpha.500" } : {}}
                onClick={() => {
                  handleClick(city);
                  setIsCityChecked(city);
                }}
              >
                {city}
              </CursorBox>
            );
          })}
        </Stack>
      </Box>
      <Box
        border={"1px solid"}
        borderBottom={"none"}
        w={"100%"}
        h={"600px"}
        overflow={"scroll"}
        overflowX={"hidden"}
      >
        {theaterNumberList.map((theater) => {
          let isSameTheater = theater.number === checkedTheaterNumber;
          return (
            <Flex key={theater.number} alignItems={"center"} gap={2}>
              <CursorBox
                p={1}
                w={"100%"}
                h={"45px"}
                alignContent={"center"}
                fontSize={"sm"}
                bgColor={isSameTheater ? "blackAlpha.200" : ""}
                _hover={
                  isSameTheater
                    ? {}
                    : {
                        bgColor: "blackAlpha.300",
                        _dark: {
                          bgColor: "blackAlpha.400",
                        },
                      }
                }
                _dark={isSameTheater ? { bgColor: "blackAlpha.500" } : {}}
                onClick={() => {
                  setCheckedTheaterNumber(theater.number);
                  handleClickTheater(theater.number);
                }}
              >
                {theater.location}
              </CursorBox>
            </Flex>
          );
        })}
      </Box>
    </Flex>
  );
}

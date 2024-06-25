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
        w={"90%"}
        h={"600px"}
      >
        <Stack gap={0}>
          {cityList.map((city) => (
            <Flex key={city} alignItems={"center"} gap={1}>
              <CursorBox
                p={1}
                h={"50px"}
                w={"100%"}
                alignContent={"center"}
                bgColor={city === isCityChecked ? "blackAlpha.200" : ""}
                _dark={
                  city === isCityChecked ? { bgColor: "blackAlpha.500" } : {}
                }
                onClick={() => {
                  handleClick(city);
                  setIsCityChecked(city);
                }}
              >
                {city}
              </CursorBox>
            </Flex>
          ))}
        </Stack>
      </Box>
      <Box
        border={"1px solid"}
        borderBottom={"none"}
        w={"100%"}
        h={"600px"}
        overflow={"scroll"}
        overflowX={"unset"}
      >
        {theaterNumberList.map((theater) => (
          <Flex key={theater.number} alignItems={"center"} gap={2}>
            <CursorBox
              p={1}
              w={"100%"}
              h={"45px"}
              alignContent={"center"}
              fontSize={"sm"}
              bgColor={
                checkedTheaterNumber === theater.number ? "blackAlpha.200" : ""
              }
              _dark={
                checkedTheaterNumber === theater.number
                  ? { bgColor: "blackAlpha.500" }
                  : {}
              }
              onClick={() => {
                setCheckedTheaterNumber(theater.number);
                handleClickTheater(theater.number);
              }}
            >
              {theater.location}
            </CursorBox>
          </Flex>
        ))}
      </Box>
    </Flex>
  );
}

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
}) {
  useEffect(() => {
    if (theaterNumberList.length === 0) {
      axios.get(`/api/theater/list`).then((res) => {
        setTheaterNumberList(res.data);
      });
    }
    setCheckedTheaterNumber(0);
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

  return (
    <Flex h={"100%"}>
      <Box border={"1px solid black"} w={"100%"} h={"600px"}>
        <Stack gap={0}>
          {cityList.map((city) => (
            <Flex key={city} alignItems={"center"} gap={1}>
              <CursorBox
                h={"50px"}
                w={"100%"}
                alignContent={"center"}
                bgColor={city === isCityChecked ? "lightgray" : ""}
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
        border={"1px solid black"}
        w={"100%"}
        h={"600px"}
        overflow={"scroll"}
      >
        {theaterNumberList.map((theater) => (
          <Flex key={theater.number} alignItems={"center"} gap={2}>
            <CursorBox
              w={"100%"}
              h={"40px"}
              alignContent={"center"}
              fontSize={"sm"}
              bgColor={
                checkedTheaterNumber === theater.number ? "lightgray" : ""
              }
              onClick={() => {
                setCheckedTheaterNumber(theater.number);
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

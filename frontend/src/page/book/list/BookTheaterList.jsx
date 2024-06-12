import { Box, Flex, Stack } from "@chakra-ui/react";
import CursorBox from "../../../css/theme/component/box/CursorBox.jsx";
import axios from "axios";

export function BookTheaterList({ cityList, theaterList }) {
  function handleClick(city) {
    axios
      .get(`/api/theater/list?city=${city}`)
      .then((res) => {
        setTheaterList(res.data);
      })
      .catch(() => {})
      .finally(() => {
        // setCityName(city);
      });
  }

  function handleClickTheaterLocation(number) {}

  return (
    <Flex h={"100%"}>
      <Box border={"1px solid black"} w={"100%"} h={"600px"}>
        <Stack gap={0}>
          {cityList.map((city) => (
            <CursorBox
              h={"50px"}
              alignContent={"center"}
              key={city}
              onClick={() => handleClick(city)}
            >
              {city}
            </CursorBox>
          ))}
        </Stack>
      </Box>
      <Box border={"1px solid black"} w={"100%"} h={"600px"}>
        {theaterList.map((theater) => (
          <Box
            key={theater.number}
            onClick={() => handleClickTheaterLocation(theater.number)}
          >
            {theater.location}
          </Box>
        ))}
      </Box>
    </Flex>
  );
}

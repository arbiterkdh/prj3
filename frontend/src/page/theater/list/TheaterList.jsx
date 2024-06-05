import { Box, Flex, Tooltip } from "@chakra-ui/react";
import TheaterListBox from "../../../css/theme/component/box/TheaterListBox.jsx";
import axios from "axios";
import GapFlex from "../../../css/theme/component/flex/GapFlex.jsx";
import CursorBox from "../../../css/theme/component/box/CursorBox.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function TheaterList({
  cityName,
  setCityName,
  cityList,
  setCityList,
  theaterList,
  setTheaterList,
  isModifying,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isModifying) {
      axios
        .get(`/api/theater/list?city=${cityName}`)
        .then((res) => {
          setTheaterList(res.data);
        })
        .catch(() => {})
        .finally(() => {
          setCityName("");
        });
    }
  }, [isModifying]);

  function handleClick(city) {
    axios
      .get(`/api/theater/list?city=${city}`)
      .then((res) => {
        setTheaterList(res.data);
      })
      .catch(() => {})
      .finally(() => {
        setCityName(city);
      });
  }

  return (
    <Box w={"100%"} border={"1px solid black"}>
      <Flex width={"100%"}>
        {cityList.map((city) => (
          <TheaterListBox key={city} onClick={() => handleClick(city)}>
            {city}
          </TheaterListBox>
        ))}
      </Flex>
      <Box>
        <GapFlex justifyContent={"left"} flexWrap={"wrap"}>
          {theaterList.map((theater) => (
            <CursorBox
              width={"20%"}
              key={theater.number}
              onClick={() => navigate("/theater/" + theater.number)}
            >
              <Tooltip hasArrow label={theater.location + " 상세보기"}>
                {theater.location}
              </Tooltip>
            </CursorBox>
          ))}
        </GapFlex>
      </Box>
    </Box>
  );
}

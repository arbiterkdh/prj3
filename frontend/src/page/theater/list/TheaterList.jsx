import { Box, Flex, Tooltip } from "@chakra-ui/react";
import TheaterListBox from "../../../css/theme/component/box/TheaterListBox.jsx";
import axios from "axios";
import { useState } from "react";
import GapFlex from "../../../css/theme/component/flex/GapFlex.jsx";
import CursorBox from "../../../css/theme/component/box/CursorBox.jsx";

export function TheaterList() {
  const [theaterList, setTheaterList] = useState([]);
  function handleClick(city) {
    axios
      .get(`/api/theater/${city}`)
      .then((res) => {
        setTheaterList(res.data);
      })
      .catch(() => {})
      .finally(() => {});
  }

  return (
    <Box w={"100%"} border={"1px solid black"}>
      <Flex width={"100%"}>
        <TheaterListBox onClick={() => handleClick("seoul")}>
          서울
        </TheaterListBox>
        <TheaterListBox onClick={() => handleClick("kyungki")}>
          경기
        </TheaterListBox>
        <TheaterListBox onClick={() => handleClick("incheon")}>
          인천
        </TheaterListBox>
        <TheaterListBox
          onClick={() => handleClick("daejeon|choongcheong|sejong")}
        >
          대전/충청/세종
        </TheaterListBox>
        <TheaterListBox onClick={() => handleClick("boosan|daegu|gyungsang")}>
          부산/대구/경상
        </TheaterListBox>
        <TheaterListBox onClick={() => handleClick("gwangjoo|jeonla")}>
          광주/전라
        </TheaterListBox>
        <TheaterListBox onClick={() => handleClick("gangwon")}>
          강원
        </TheaterListBox>
        <TheaterListBox onClick={() => handleClick("jeju")}>
          제주
        </TheaterListBox>
      </Flex>
      <Box>
        <GapFlex justifyContent={"space-between"} flexWrap={"wrap"}>
          {theaterList.map((theater) => (
            <CursorBox width={"20%"} key={theater.number}>
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

import { Box, Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MarginBox from "../../../css/theme/component/box/MarginBox.jsx";

export function BookTheaterLocationMovieList({
  checkedTheaterNumber,
  onScreenList,
  willScreenList,
  checkedMovieId,
  selectedDay,
  setSelectedDay,
  theaterBoxList,
}) {
  const date = new Date();
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const minute =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const second =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  const now = new Date(
    `${year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + second}`,
  );

  const [theaterBoxListFilteredByDate, setTheaterBoxListFilteredByDate] =
    useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (checkedTheaterNumber && selectedDay) {
      axios
        .get(
          `/api/theaterbox/onscreenlist?date=${selectedDay.slice(0, -2)}&theaterNumber=${checkedTheaterNumber}`,
        )
        .then((res) => {
          console.log(res.data);
          setTheaterBoxListFilteredByDate(res.data);
        });
      // 체크한 날짜에 맞는 타임테이블 가져오기.
    }
  }, [checkedTheaterNumber, selectedDay]);

  // 영화 시작시간 아침 9시
  // 영화 마감시간 밤 12시

  function handleBookDataClick(state) {
    // 예매 데이터 클릭 처리
  }

  return (
    <Box h={"inherit"} overflowY={"scroll"}>
      {theaterBoxListFilteredByDate &&
        theaterBoxListFilteredByDate.map((theaterBoxFilteredByDate, index) => (
          <Box key={index}>
            {theaterBoxFilteredByDate.bookPlaceTimeLeft && (
              <Box>
                <Box
                  m={0}
                  color={"whiteAlpha.900"}
                  bgColor={"darkslategray"}
                  opacity={"0.9"}
                  h={"35px"}
                  fontSize={"lg"}
                  textAlign={"center"}
                  alignContent={"center"}
                >
                  {theaterBoxFilteredByDate.boxNumber} 관
                </Box>
                {theaterBoxFilteredByDate.theaterBoxMovieList.map(
                  (theaterBoxMovie, index) => (
                    <Box key={index}>
                      {theaterBoxMovie.bookPlaceTimeList.length > 0 && (
                        <Box
                          display={
                            !checkedMovieId
                              ? "block"
                              : theaterBoxMovie.movieId === checkedMovieId
                                ? "block"
                                : "none"
                          }
                        >
                          <Heading p={3} mt={5} mb={0}>
                            {theaterBoxMovie.movieTitle}
                          </Heading>
                          <Flex wrap={"wrap"} p={1}>
                            {theaterBoxMovie.bookPlaceTimeList.map(
                              (bookPlaceTime, index) => (
                                <Box key={index}>
                                  {now.getTime() <
                                  new Date(
                                    `${bookPlaceTime.startTime}`,
                                  ).getTime() ? (
                                    <MarginBox
                                      bgColor={"blackAlpha.100"}
                                      my={"6px"}
                                      p={"7px"}
                                      h={"60px"}
                                      align={"center"}
                                      alignContent={"center"}
                                      cursor={"pointer"}
                                      _hover={{
                                        bgColor: "blackAlpha.300",
                                      }}
                                    >
                                      <Box fontSize={"xs"}>
                                        시간:
                                        {" " +
                                          bookPlaceTime.startTime.slice(11, 16)}
                                        ~{bookPlaceTime.endTime.slice(11, 16)}
                                      </Box>
                                      <Box fontSize={"xs"}>
                                        남은좌석:
                                        {" " + bookPlaceTime.vacancy}/
                                        {theaterBoxFilteredByDate.capacity}
                                      </Box>
                                    </MarginBox>
                                  ) : (
                                    <MarginBox
                                      bgColor={"blackAlpha.100"}
                                      opacity={"0.3"}
                                      my={"6px"}
                                      p={"7px"}
                                      h={"60px"}
                                      align={"center"}
                                      alignContent={"center"}
                                      cursor={"default"}
                                    >
                                      <Box fontSize={"xs"}>
                                        시간:
                                        {" " +
                                          bookPlaceTime.startTime.slice(11, 16)}
                                        ~{bookPlaceTime.endTime.slice(11, 16)}
                                      </Box>
                                      <Box fontSize={"xs"}>
                                        남은좌석:
                                        {" " + bookPlaceTime.vacancy}/
                                        {theaterBoxFilteredByDate.capacity}
                                      </Box>
                                    </MarginBox>
                                  )}
                                </Box>
                              ),
                            )}
                          </Flex>
                        </Box>
                      )}
                    </Box>
                  ),
                )}
              </Box>
            )}
          </Box>
        ))}
    </Box>
  );
}

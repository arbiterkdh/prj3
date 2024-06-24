import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function BookTheaterLocationMovieList({
  checkedTheaterNumber,
  onScreenList,
  willScreenList,
  checkedMovieId,
  selectedDay,
  setSelectedDay,
  theaterBoxList,
}) {
  const [timeTableRemain, setTimeTableRemain] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/theaterbox/list/${selectedDay.slice(0, -2)}`)
      .then((res) => {});
    // 체크한 날짜에 맞는 타임테이블 가져오기.
  }, [checkedTheaterNumber, selectedDay]);

  // 영화 시작시간 아침 9시
  // 영화 마감시간 밤 12시

  function handleBookDataClick(state) {
    // 예매 데이터 클릭 처리
  }

  return (
    <Box h={"inherit"} overflowY={"scroll"}>
      {/*{theaterBoxList.length > 0 && (*/}
      {/*  <Box>*/}
      {/*    {theaterBoxList.map((theaterBox, index) => (*/}
      {/*      <Box key={index} minHeight={"200px"} mb={2}>*/}
      {/*        {theaterBox.movieIdList.includes(checkedMovieId) && (*/}
      {/*          <Stack>*/}
      {/*            <Box*/}
      {/*              p={1}*/}
      {/*              color={"whiteAlpha.900"}*/}
      {/*              bgColor={"darkslategray"}*/}
      {/*              fontSize={"1rem"}*/}
      {/*              display={theaterBox.bookPlaceTimeLeft ? "" : "none"}*/}
      {/*            >*/}
      {/*              {theaterBox.boxNumber} 관*/}
      {/*            </Box>*/}
      {/*            <MarginBox>*/}
      {/*              {theaterBox.theaterBoxMovieList.map(*/}
      {/*                (theaterBoxMovie, index) => (*/}
      {/*                  <Box key={index} p={1}>*/}
      {/*                    {theaterBoxMovie.movieId === checkedMovieId && (*/}
      {/*                      <Box w={"350px"}>*/}
      {/*                        {theaterBoxMovie.bookPlaceTimeList.length > 0 && (*/}
      {/*                          <Heading>{theaterBoxMovie.movieTitle}</Heading>*/}
      {/*                        )}*/}
      {/*                        <GapFlex flexWrap={"wrap"}>*/}
      {/*                          {theaterBoxMovie.bookPlaceTimeList.map(*/}
      {/*                            (bookPlaceTime, index) => (*/}
      {/*                              <Box*/}
      {/*                                key={index}*/}
      {/*                                display={*/}
      {/*                                  bookPlaceTime.startTime.slice(0, -9) ===*/}
      {/*                                  selectedDay.slice(0, -2)*/}
      {/*                                    ? "block"*/}
      {/*                                    : "none"*/}
      {/*                                }*/}
      {/*                              >*/}
      {/*                                <Flex*/}
      {/*                                  h={"80px"}*/}
      {/*                                  onClick={() =>*/}
      {/*                                    navigate("/book/theaterseat")*/}
      {/*                                  }*/}
      {/*                                >*/}
      {/*                                  <Stack*/}
      {/*                                    p={2}*/}
      {/*                                    w={"100px"}*/}
      {/*                                    bgColor={"blackAlpha.200"}*/}
      {/*                                    fontWeight={"bold"}*/}
      {/*                                    cursor={"pointer"}*/}
      {/*                                    justifyContent={"space-evenly"}*/}
      {/*                                  >*/}
      {/*                                    <Box fontSize={"11px"}>*/}
      {/*                                      상영시작:{" "}*/}
      {/*                                      {bookPlaceTime.startTime.slice(*/}
      {/*                                        11,*/}
      {/*                                        -3,*/}
      {/*                                      )}*/}
      {/*                                    </Box>*/}
      {/*                                    <Box fontSize={"small"}>*/}
      {/*                                      좌석: {bookPlaceTime.vacancy}/*/}
      {/*                                      {theaterBox.capacity}*/}
      {/*                                    </Box>*/}
      {/*                                  </Stack>*/}
      {/*                                </Flex>*/}
      {/*                              </Box>*/}
      {/*                            ),*/}
      {/*                          )}*/}
      {/*                        </GapFlex>*/}
      {/*                      </Box>*/}
      {/*                    )}*/}
      {/*                  </Box>*/}
      {/*                ),*/}
      {/*              )}*/}
      {/*            </MarginBox>*/}
      {/*          </Stack>*/}
      {/*        )}*/}
      {/*      </Box>*/}
      {/*    ))}*/}
      {/*  </Box>*/}
      {/*)}*/}
    </Box>
  );
}

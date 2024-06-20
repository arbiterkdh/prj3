import { Box } from "@chakra-ui/react";
import { useEffect } from "react";

export function BookTheaterLocationMovieList({
  checkedTheaterNumber,
  onScreenList,
  willScreenList,
  checkedMovieId,
  selectedDay,
  setSelectedDay,
}) {
  useEffect(() => {
    // 체크한 날짜에 맞는 타임테이블 가져오기.
  }, [checkedTheaterNumber, selectedDay]);

  // 영화 시작시간 아침 9시
  // 영화 마감시간 밤 12시

  function handleBookDataClick(state) {
    // 예매 데이터 클릭 처리
  }

  return (
    <Box h={"inherit"} overflowY={"scroll"}>
      {/*{checkedTheaterNumber > 0 ? "" : "도시/지점을 선택해주세요."}*/}
      {/*<CursorBox m={0}>*/}
      {/*  {onScreenList.map((movie, index) =>*/}
      {/*    movie.theaterList[checkedTheaterNumber] ? (*/}
      {/*      <BookTimeBox*/}
      {/*        h={"inherit"}*/}
      {/*        key={index}*/}
      {/*        display={*/}
      {/*          movie.theaterList[checkedTheaterNumber]*/}
      {/*            ? checkedMovieId === movie.id*/}
      {/*              ? "inherit"*/}
      {/*              : checkedMovieId > 0*/}
      {/*                ? "none"*/}
      {/*                : "inherit"*/}
      {/*            : "none"*/}
      {/*        }*/}
      {/*        onClick={() => handleBookDataClick("상영중")}*/}
      {/*      >*/}
      {/*        {movie.theaterList[checkedTheaterNumber]*/}
      {/*          ? `상영중 : ${movie.title}`*/}
      {/*          : ""}*/}
      {/*        <Stack>*/}
      {/*          {movie.theaterList[checkedTheaterNumber].map(*/}
      {/*            (theater, index) => (*/}
      {/*              <Stack key={index}>*/}
      {/*                <Box>{theater.boxNumber} 관</Box>*/}
      {/*                <GapFlex>*/}
      {/*                  {theater.theaterBoxMovieList.map(*/}
      {/*                    (theaterBoxMovie, index) => (*/}
      {/*                      <GapFlex key={index}>*/}
      {/*                        {theaterBoxMovie.bookPlaceTimeList.map(*/}
      {/*                          (bookPlaceTime, index) => (*/}
      {/*                            <Box key={index}>*/}
      {/*                              <Box>{bookPlaceTime.time}</Box>*/}
      {/*                              <Box>*/}
      {/*                                {bookPlaceTime.vacancy}/{theater.capacity}*/}
      {/*                              </Box>*/}
      {/*                            </Box>*/}
      {/*                          ),*/}
      {/*                        )}*/}
      {/*                      </GapFlex>*/}
      {/*                    ),*/}
      {/*                  )}*/}
      {/*                </GapFlex>*/}
      {/*              </Stack>*/}
      {/*            ),*/}
      {/*          )}*/}
      {/*        </Stack>*/}
      {/*      </BookTimeBox>*/}
      {/*    ) : null,*/}
      {/*  )}*/}
      {/*</CursorBox>*/}
      {/*<CursorBox m={0}>*/}
      {/*  {willScreenList.map((movie, index) =>*/}
      {/*    movie.theaterList[checkedTheaterNumber] ? (*/}
      {/*      <BookTimeBox*/}
      {/*        key={index}*/}
      {/*        display={*/}
      {/*          movie.theaterList[checkedTheaterNumber]*/}
      {/*            ? checkedMovieId === movie.id*/}
      {/*              ? "inherit"*/}
      {/*              : checkedMovieId > 0*/}
      {/*                ? "none"*/}
      {/*                : "inherit"*/}
      {/*            : "none"*/}
      {/*        }*/}
      {/*        onClick={() => {*/}
      {/*          handleBookDataClick("예정작");*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        {movie.theaterList[checkedTheaterNumber]*/}
      {/*          ? `예정작 : ${movie.title}`*/}
      {/*          : ""}*/}
      {/*      </BookTimeBox>*/}
      {/*    ) : null,*/}
      {/*  )}*/}
      {/*</CursorBox>*/}
    </Box>
  );
}

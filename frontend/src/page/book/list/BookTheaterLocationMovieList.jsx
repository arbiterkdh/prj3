import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import BookTimeBox from "../../../css/theme/component/box/BookTimeBox.jsx";
import CursorBox from "../../../css/theme/component/box/CursorBox.jsx";

export function BookTheaterLocationMovieList({
  checkedTheaterNumber,
  onScreenList,
  willScreenList,
  checkedMovieId,
  selectedDay,
  setSelectedDay,
}) {
  useEffect(() => {}, [checkedTheaterNumber]);

  // 영화 시작시간 아침 9시
  // 영화 마감시간 밤 12시

  function handleBookDataClick(state) {}

  return (
    <Box h={"inherit"} overflowY={"scroll"}>
      {checkedTheaterNumber > 0 ? "" : "상영관을 선택해주세요."}
      <CursorBox m={0}>
        {onScreenList.map((movie, index) => (
          <BookTimeBox
            key={index}
            display={
              movie.theater_number.includes(checkedTheaterNumber)
                ? checkedMovieId === movie.id
                  ? "inherit"
                  : checkedMovieId > 0
                    ? "none"
                    : "inherit"
                : "none"
            }
            onClick={(e) => handleBookDataClick("상영중")}
          >
            {movie.theater_number.includes(checkedTheaterNumber)
              ? `상영중 : ${movie.title}`
              : ""}
          </BookTimeBox>
        ))}
      </CursorBox>
      <CursorBox m={0}>
        {willScreenList.map((movie, index) => (
          <BookTimeBox
            key={index}
            display={
              movie.theater_number.includes(checkedTheaterNumber)
                ? checkedMovieId === movie.id
                  ? "inherit"
                  : checkedMovieId > 0
                    ? "none"
                    : "inherit"
                : "none"
            }
            onClick={(e) => {
              handleBookDataClick("예정작");
            }}
          >
            {movie.theater_number.includes(checkedTheaterNumber)
              ? `예정작 : ${movie.title}`
              : ""}
          </BookTimeBox>
        ))}
      </CursorBox>
    </Box>
  );
}

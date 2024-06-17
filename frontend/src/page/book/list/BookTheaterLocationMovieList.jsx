import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import BookTimeBox from "../../../css/theme/component/box/BookTimeBox.jsx";

export function BookTheaterLocationMovieList({
  checkedTheaterNumber,
  onScreenList,
  willScreenList,
  checkedMovieId,
}) {
  useEffect(() => {}, [checkedTheaterNumber]);

  // 영화 시작시간 아침 9시
  // 영화 마감시간 밤 12시

  return (
    <Box h={"inherit"} overflowY={"scroll"}>
      {checkedTheaterNumber > 0 ? "" : "상영관을 선택해주세요."}
      <Box>
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
          >
            {movie.theater_number.includes(checkedTheaterNumber)
              ? `상영중 : ${movie.title}`
              : ""}
          </BookTimeBox>
        ))}
      </Box>
      <Box>
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
          >
            {movie.theater_number.includes(checkedTheaterNumber)
              ? `예정작 : ${movie.title}`
              : ""}
          </BookTimeBox>
        ))}
      </Box>
    </Box>
  );
}

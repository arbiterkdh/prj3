import { Box, Input, Stack } from "@chakra-ui/react";
import { useEffect } from "react";

export function BookMovieList({
  checkedTheaterNumber,
  movieLocationAdd,
  onScreenList,
  willScreenList,
  checkedMovieId,
  setCheckedMovieId,
}) {
  useEffect(() => {
    setCheckedMovieId(0);
  }, [checkedTheaterNumber, movieLocationAdd]);

  return (
    <Box>
      <Stack>
        {onScreenList.map((movie) => (
          <Box key={movie.id}>
            <Input
              w={"95%"}
              cursor={"pointer"}
              border={"none"}
              value={movie.title}
              bgColor={checkedMovieId === movie.id ? "lightgray" : ""}
              isDisabled={!movie.theater_number.includes(checkedTheaterNumber)}
              onClick={() => {
                setCheckedMovieId(movie.id);
              }}
              readOnly
            />
          </Box>
        ))}
        {willScreenList.map((movie) => (
          <Box key={movie.id}>
            <Input
              w={"95%"}
              cursor={"pointer"}
              border={"none"}
              value={movie.title}
              bgColor={checkedMovieId === movie.id ? "lightgray" : ""}
              isDisabled={!movie.theater_number.includes(checkedTheaterNumber)}
              onClick={() => {
                setCheckedMovieId(movie.id);
              }}
              readOnly
            />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

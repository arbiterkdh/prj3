import { Box, Input, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export function BookMovieList({
  checkedTheaterNumber,
  movieLocationAdd,
  onScreenList,
  willScreenList,
}) {
  const [clickedBox, setClickedBox] = useState(0);

  useEffect(() => {
    setClickedBox(0);
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
              bgColor={clickedBox === movie.id ? "lightgray" : ""}
              isDisabled={!movie.theater_number.includes(checkedTheaterNumber)}
              onClick={() => {
                setClickedBox(movie.id);
              }}
              readOnly
            />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

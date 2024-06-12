import { Box, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function BookMovieList({
  movieList,
  setMovieList,
  movieLocationAndMovieList,
}) {
  const [movieLocationList, setMovieLocationList] = useState([]);
  const [canBookMovieList, setCanBookMovieList] = useState([]);

  useEffect(() => {
    axios.get("/api/book/on-movie-list").then((res) => {
      setMovieLocationList(res.data);
    });
  }, []);
  return (
    <Box>
      <Stack h={"600px"} overflow={"scroll"}>
        {movieLocationAndMovieList &&
          movieLocationAndMovieList.map((movieLocationAndMovie) => (
            <Box
              key={
                movieLocationAndMovie.id + movieLocationAndMovie.theater_number
              }
            >
              {movieLocationAndMovie.title}
            </Box>
          ))}
      </Stack>
    </Box>
  );
}

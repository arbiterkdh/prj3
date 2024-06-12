import { Box, Input, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import CursorBox from "../../../css/theme/component/box/CursorBox.jsx";

export function BookMovieList({ movieList, checkedTheaterNumber }) {
  const [onMovieList, setOnMovieList] = useState([]);
  const [clickedBox, setClickedBox] = useState("");
  const [canBookMovieIdList, setCanBookMovieIdList] = useState([]);

  useEffect(() => {
    axios.get("/api/book/onmovielist").then((res) => {
      setOnMovieList(res.data);
    });

    if (checkedTheaterNumber) {
      axios
        .get(`/api/book/list?theaternumber=${checkedTheaterNumber}`)
        .then((res) => {
          setCanBookMovieIdList(res.data);
        })
        .catch()
        .finally(() => {});
    }
  }, [checkedTheaterNumber]);

  return (
    <Box>
      <Stack h={"600px"} overflow={"scroll"}>
        {onMovieList.map((movie) => (
          <CursorBox
            bgColor={clickedBox === movie.id ? "lightgray" : ""}
            key={movie.id + (movie.theater_number ? movie.theater_number : "")}
            onClick={() => {
              setClickedBox(movie.id);
            }}
          >
            <Input
              cursor={"pointer"}
              border={"none"}
              isDisabled={
                movie.id !== movie.movie_id ||
                movie.theater_number !== checkedTheaterNumber
              }
              value={movie.title}
              readOnly
            />
          </CursorBox>
        ))}
      </Stack>
    </Box>
  );
}

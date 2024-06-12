import BorderSelect from "../../../css/theme/component/select/BorderSelect.jsx";
import { Button, Flex, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function BookMovieLocationAdd({
  cityList,
  setMovieLocationAdd,
  movieList,
  setMovieList,
}) {
  const [theaterList, setTheaterList] = useState([]);
  const [movieId, setMovieId] = useState(0);
  const [theaterNumber, setTheaterNumber] = useState(0);

  const toast = useToast();

  useEffect(() => {
    axios.get(`/api/theater/list`).then((res) => {
      setTheaterList(res.data);
    });
    axios.get("/api/book/movie/list").then((res) => {
      setMovieList(res.data);
    });
  }, []);
  function handleClickMovieLocationAdd() {
    axios
      .post(`/api/book/movie-location/add`, {
        movie_id: movieId,
        theater_number: theaterNumber,
      })
      .then((res) => {
        setMovieLocationAdd(res.data);
      })
      .catch((err) => {
        if (err.response.status === 409) {
          toast({
            status: "error",
            description: "이미 상영중인 영화입니다.",
            position: "bottom-right",
          });
        }
      });
  }

  function handleCitySelect(city) {
    axios.get(`/api/theater/list?city=${city}`).then((res) => {
      setTheaterList(res.data);
    });
  }
  return (
    <Flex my={"100px"}>
      <BorderSelect
        placeholder={"도시명"}
        onChange={(e) => {
          handleCitySelect(e.target.value);
        }}
      >
        {cityList.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </BorderSelect>
      <BorderSelect
        placeholder={"지점명"}
        onChange={(e) => {
          setTheaterNumber(e.target.value);
        }}
      >
        {theaterList.map((theater) => (
          <option key={theater.number} value={theater.number}>
            {theater.location}
          </option>
        ))}
      </BorderSelect>
      <BorderSelect
        placeholder={"영화명"}
        onChange={(e) => {
          setMovieId(e.target.value);
        }}
      >
        {movieList.map((movie) => (
          <option key={movie.id} value={movie.id}>
            {movie.title}
          </option>
        ))}
      </BorderSelect>
      <Button w={"200px"} onClick={handleClickMovieLocationAdd}>
        상영영화추가
      </Button>
    </Flex>
  );
}

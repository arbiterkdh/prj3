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

  const [isCitySelected, setIsCitySelected] = useState("");
  const [isLocationSelected, setIsLocationSelected] = useState("");
  const [isStateSelected, setIsStateSelected] = useState("");
  const [onScreenList, setOnScreenList] = useState([]);
  const [willScreenList, setWillScreenList] = useState([]);

  const toast = useToast();

  useEffect(() => {
    Promise.all([
      axios.get(`/api/book/onscreenlist/all`),
      axios.get(`/api/book/willscreenlist/all`),
      axios.get(`/api/theater/list`),
      axios.get("/api/book/movie/list"),
    ]).then(([onScreenRes, willScreenRes, theaterRes, movieRes]) => {
      setOnScreenList(onScreenRes.data);
      setWillScreenList(willScreenRes.data);
      setTheaterList(theaterRes.data);
      setMovieList(movieRes.data);
    });
  }, []);

  function handleClickMovieLocationAdd() {
    axios
      .post(`/api/book/movielocation/add`, {
        movieId,
        theaterNumber,
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
        value={isCitySelected}
        onChange={(e) => {
          handleCitySelect(e.target.value);
          setIsCitySelected(e.target.value);
          setIsLocationSelected("");
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
        value={isLocationSelected}
        isDisabled={!isCitySelected}
        onChange={(e) => {
          setTheaterNumber(e.target.value);
          setIsLocationSelected(e.target.value);
        }}
      >
        {theaterList.map((theater) => (
          <option key={theater.number} value={theater.number}>
            {theater.location}
          </option>
        ))}
      </BorderSelect>
      <BorderSelect
        placeholder={"상태"}
        value={isStateSelected}
        onChange={(e) => {
          setIsStateSelected(e.target.value);
          setMovieId("");
        }}
      >
        <option value="상영예정">상영예정</option>
        <option value="상영중">상영중</option>
      </BorderSelect>
      <BorderSelect
        placeholder={"영화명"}
        value={movieId}
        isDisabled={!isStateSelected}
        onChange={(e) => {
          setMovieId(e.target.value);
        }}
      >
        {isStateSelected === "상영예정" ? (
          willScreenList.map((movie) => (
            <option key={movie.id} value={movie.id}>
              {movie.title}
            </option>
          ))
        ) : isStateSelected === "상영중" ? (
          onScreenList.map((movie) => (
            <option key={movie.id} value={movie.id}>
              {movie.title}
            </option>
          ))
        ) : (
          <option>영화명</option>
        )}
      </BorderSelect>
      <Button
        w={"40%"}
        isDisabled={!movieId || !isLocationSelected}
        onClick={handleClickMovieLocationAdd}
      >
        영화추가
      </Button>
    </Flex>
  );
}

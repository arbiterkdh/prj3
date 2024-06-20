import { Box, Button, Flex, Select, Stack } from "@chakra-ui/react";
import BookBox from "../../css/theme/component/box/BookBox.jsx";
import OuterBookBox from "../../css/theme/component/box/OuterBookBox.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { BookTheaterList } from "./list/BookTheaterList.jsx";
import { BookMovieList } from "./list/BookMovieList.jsx";
import { useNavigate, useOutletContext } from "react-router-dom";
import { BookDateComponent } from "./date/BookDateComponent.jsx";
import { BookTheaterLocationMovieList } from "./list/BookTheaterLocationMovieList.jsx";

export function Book() {
  const {
    cityList,
    setCityList,
    theaterNumberList,
    setTheaterNumberList,
    movieList,
    setMovieList,
    onScreenList,
    setOnScreenList,
    willScreenList,
    setWillScreenList,
    movieLocationAdd,
    setBookProgress,
  } = useOutletContext();

  const navigate = useNavigate();

  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  let yoil = date.getDay();
  switch ((yoil % 7) + 1) {
    case 1:
      yoil = "일";
      break;
    case 2:
      yoil = "월";
      break;
    case 3:
      yoil = "화";
      break;
    case 4:
      yoil = "수";
      break;
    case 5:
      yoil = "목";
      break;
    case 6:
      yoil = "금";
      break;
    case 7:
      yoil = "토";
      break;
  }
  const dateString = year + "-" + month + "-" + day + "-" + yoil;

  const [isCityChecked, setIsCityChecked] = useState("서울");
  const [checkedTheaterNumber, setCheckedTheaterNumber] = useState(0);
  const [checkedMovieId, setCheckedMovieId] = useState(0);
  const [selectedDay, setSelectedDay] = useState(dateString);

  useEffect(() => {
    setBookProgress(1);

    axios.get("/api/theater").then((res) => {
      setCityList(res.data);
    });

    Promise.all([
      axios.get(`/api/book/onscreenlist/${selectedDay.slice(0, -2)}`),
      axios.get(`/api/book/willscreenlist/${selectedDay.slice(0, -2)}`),
    ]).then(([onScreenRes, willScreenRes]) => {
      setOnScreenList(onScreenRes.data);
      setWillScreenList(willScreenRes.data);
      console.log("onScreenRes.data", onScreenRes.data);
      console.log("willScreenRes.data", willScreenRes.data);
    });
  }, [theaterNumberList, movieLocationAdd, selectedDay]);

  return (
    <Stack w={"100%"} h={"500px"}>
      <Flex>
        <OuterBookBox>
          <BookBox>상영 도시/지점명</BookBox>
          <BookBox></BookBox>
          <BookTheaterList
            cityList={cityList}
            theaterNumberList={theaterNumberList}
            setTheaterNumberList={setTheaterNumberList}
            isCityChecked={isCityChecked}
            setIsCityChecked={setIsCityChecked}
            checkedTheaterNumber={checkedTheaterNumber}
            setCheckedTheaterNumber={setCheckedTheaterNumber}
          />
        </OuterBookBox>
        <OuterBookBox>
          <BookBox>영화 선택</BookBox>
          <BookBox>
            <Select>
              <option value={"예매순"}>예매순</option>
              <option value={"관객순"}>관객순</option>
              <option value={"예정작"}>예정작</option>
            </Select>
          </BookBox>
          <Box
            h={"600px"}
            overflow={"scroll"}
            overflowX={"unset"}
            border={"1px solid"}
          >
            <BookMovieList
              checkedTheaterNumber={checkedTheaterNumber}
              movieLocationAdd={movieLocationAdd}
              onScreenList={onScreenList}
              willScreenList={willScreenList}
              checkedMovieId={checkedMovieId}
              setCheckedMovieId={setCheckedMovieId}
            />
            <Box>
              {movieLocationAdd &&
                movieLocationAdd.map((movie) => (
                  <Box key={movie.movieId}>{movie.movieId}</Box>
                ))}
            </Box>
          </Box>
        </OuterBookBox>
        <OuterBookBox>
          <BookDateComponent
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
          <Box h={"550px"} border={"1px solid"}>
            <BookTheaterLocationMovieList
              checkedTheaterNumber={checkedTheaterNumber}
              onScreenList={onScreenList}
              willScreenList={willScreenList}
              checkedMovieId={checkedMovieId}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />
            <Button onClick={() => navigate("/book/theaterseat")}>예매</Button>
          </Box>
        </OuterBookBox>
      </Flex>
    </Stack>
  );
}

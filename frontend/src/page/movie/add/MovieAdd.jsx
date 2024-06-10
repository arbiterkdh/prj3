import {
  Box,
  Button,
  Center,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import CenterBox from "../../../css/theme/component/box/CenterBox.jsx";

export function MovieAdd() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState([]);
  const [content, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [runningTime, setRunningTime] = useState(0);
  const [movieType, setMovieType] = useState([]);
  const [rating, setRating] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [director, setDirector] = useState("");
  const [actors, setActors] = useState("");

  const navigate = useNavigate();

  function handleMovieSave() {
    axios
      .postForm("/api/movie/add", {
        title,
        file,
        content,
        genre,
        runningTime,
        movieType,
        rating,
        startDate: startDate.toISOString().split("T")[0],
        director,
        actors,
      })
      .then(() => navigate("/movie"));
  }

  let disableSaveButton = false;
  if (title.trim().length === 0) {
    disableSaveButton = true;
  }
  if (file.length === 0) {
    disableSaveButton = true;
  }
  if (content.trim().length === 0) {
    disableSaveButton = true;
  }
  if (genre.trim().length === 0) {
    disableSaveButton = true;
  }
  if (runningTime === 0) {
    disableSaveButton = true;
  }
  if (movieType.length === 0) {
    disableSaveButton = true;
  }
  if (rating === 0) {
    disableSaveButton = true;
  }
  if (startDate === null) {
    disableSaveButton = true;
  }
  if (director.trim().length === 0) {
    disableSaveButton = true;
  }
  if (actors.trim().length === 0) {
    disableSaveButton = true;
  }

  function handleMovieType(value, checked) {
    if (checked) {
      setMovieType([...movieType, value]);
    } else {
      setMovieType(movieType.filter((item) => item !== value));
    }
  }

  function handleMovieCancel() {
    navigate("/movie");
  }

  return (
    <Center>
      <CenterBox>
        <Heading>영화 추가</Heading>

        <Box>
          <Stack>
            <Box>
              <FormControl>
                <FormLabel>제목</FormLabel>
                <Input onChange={(e) => setTitle(e.target.value)} />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>이미지</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files)}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>영화 설명</FormLabel>
                <Textarea
                  border={"1px solid black"}
                  resize={"none"}
                  placeholder={"영화 내용을 입력해주세요."}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>장르</FormLabel>
                <Input
                  placeholder=", 로 구분"
                  onChange={(e) => setGenre(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>상영시간</FormLabel>
                <Input
                  type={"number"}
                  placeholder={"분 단위로 입력"}
                  onChange={(e) => setRunningTime(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box>
              <FormLabel>상영 타입</FormLabel>
              <CheckboxGroup>
                <Stack spacing={[1, 5]} direction={["column", "row"]}>
                  <Checkbox
                    value="2D"
                    onChange={(e) =>
                      handleMovieType(e.target.value, e.target.checked)
                    }
                  >
                    2D
                  </Checkbox>
                  <Checkbox
                    value="3D"
                    onChange={(e) =>
                      handleMovieType(e.target.value, e.target.checked)
                    }
                  >
                    3D
                  </Checkbox>
                </Stack>
              </CheckboxGroup>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>관람등급</FormLabel>
                <Input
                  type={"number"}
                  placeholder={"예) 12세 이상이면 '12' 입력"}
                  onChange={(e) => setRating(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>개봉일</FormLabel>
                <DatePicker
                  locale={ko}
                  dateFormat="yyyy년 MM월 dd일"
                  selected={startDate}
                  minDate={new Date()}
                  onChange={(date) => setStartDate(date)}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>감독</FormControl>
              <Input onChange={(e) => setDirector(e.target.value)} />
            </Box>
            <Box>
              <FormControl>출연진</FormControl>
              <Input onChange={(e) => setActors(e.target.value)} />
            </Box>
            <Box>
              <Button onClick={handleMovieCancel}>취소</Button>
              <Button
                isDisabled={disableSaveButton}
                onClick={handleMovieSave}
                colorScheme={"blue"}
              >
                저장
              </Button>
            </Box>
          </Stack>
        </Box>
      </CenterBox>
    </Center>
  );
}

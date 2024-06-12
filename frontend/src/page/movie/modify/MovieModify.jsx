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
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import CenterBox from "../../../css/theme/component/box/CenterBox.jsx";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function MovieModify() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [movieTypes, setMovieTypes] = useState([]);
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    axios.get(`/api/movie/${id}`).then((res) => {
      setMovie(res.data);
      setMovieTypes(res.data.type);
    });
  }, []);

  if (movie === null) {
    return <Spinner />;
  }

  function handleModifyClick() {
    axios
      .put("/api/movie/edit", {
        id: movie.id,
        title: movie.title,
        content: movie.content,
        genre: movie.genre,
        runningTime: movie.runningTime,
        rating: movie.rating,
        startDate: movie.startDate,
        director: movie.director,
        actors: movie.actors,
        type: movieTypes,
      })
      .then(() => navigate(`/movie/view/${movie.id}`))
      .catch(() => {})
      .finally(() => {});
  }

  function handleCancelClick() {
    navigate(`/movie/view/${movie.id}`);
  }

  function handleMovieType(value, checked) {
    if (checked) {
      setMovieTypes([...movieTypes, value]);
    } else {
      setMovieTypes(movieTypes.filter((type) => type !== value));
    }
  }

  return (
    <Center>
      <CenterBox>
        <Heading mb={10}>영화 수정</Heading>

        <Box>
          <Stack>
            <Box>
              <FormControl>
                <FormLabel>제목</FormLabel>
                <Input
                  defaultValue={movie.title}
                  onChange={(e) =>
                    setMovie({ ...movie, title: e.target.value })
                  }
                />
              </FormControl>
            </Box>
            {/*<Box>*/}
            {/*  <FormControl>*/}
            {/*    <FormLabel>이미지</FormLabel>*/}
            {/*    <Input*/}
            {/*      type="file"*/}
            {/*      accept="image/*"*/}
            {/*      onChange={(e) => setFile(e.target.files)}*/}
            {/*    />*/}
            {/*  </FormControl>*/}
            {/*</Box>*/}
            <Box>
              <FormControl>
                <FormLabel>영화 설명</FormLabel>
                <Textarea
                  border={"1px solid black"}
                  defaultValue={movie.content}
                  placeholder={"영화 내용을 입력해주세요."}
                  onChange={(e) =>
                    setMovie({ ...movie, content: e.target.value })
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>장르</FormLabel>
                <Input
                  defaultValue={movie.genre}
                  placeholder=", 로 구분"
                  onChange={(e) =>
                    setMovie({ ...movie, genre: e.target.value })
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>상영시간</FormLabel>
                <Input
                  type={"number"}
                  defaultValue={movie.runningTime}
                  placeholder={"분 단위로 입력"}
                  onChange={(e) =>
                    setMovie({ ...movie, runningTime: e.target.value })
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <FormLabel>상영 타입</FormLabel>
              <CheckboxGroup defaultValue={movieTypes}>
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
                  defaultValue={movie.rating}
                  placeholder={"예) 12세 이상이면 '12' 입력"}
                  onChange={(e) =>
                    setMovie({ ...movie, rating: e.target.value })
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>개봉일</FormLabel>
                <DatePicker
                  locale={ko}
                  dateFormat="yyyy년 MM월 dd일"
                  selected={movie.startDate}
                  minDate={new Date()}
                  onChange={(date) => setMovie({ ...movie, startDate: date })}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>감독</FormControl>
              <Input
                defaultValue={movie.director}
                onChange={(e) =>
                  setMovie({ ...movie, director: e.target.value })
                }
              />
            </Box>
            <Box>
              <FormControl>출연진</FormControl>
              <Input
                defaultValue={movie.actors}
                onChange={(e) => setMovie({ ...movie, actors: e.target.value })}
              />
            </Box>
            <Box>
              <Button onClick={handleCancelClick}>취소</Button>
              <Button onClick={onOpen} colorScheme={"blue"}>
                수정
              </Button>
            </Box>
          </Stack>
        </Box>
      </CenterBox>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>수정 확인</ModalHeader>
          <ModalBody>수정 하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>취소</Button>
            <Button onClick={handleModifyClick} colorScheme={"blue"}>
              수정
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}

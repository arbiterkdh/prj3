import {
  Box,
  Button,
  Center,
  Checkbox,
  CheckboxGroup,
  Flex,
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
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ColorButton from "../../../css/theme/component/button/ColorButton.jsx";

export function MovieModify() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [movieTypes, setMovieTypes] = useState([]);
  const [fileName, setFileName] = useState("");
  const [addFile, setAddFile] = useState(null);
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const fileRef = useRef();

  useEffect(() => {
    axios.get(`/api/movie/${id}`).then((res) => {
      const parts = res.data.movie.movieImageFile.split("/");
      const lastword = parts[parts.length - 1];
      console.log(lastword);
      setMovie(res.data.movie);
      setMovieTypes(res.data.movie.type);
      if (lastword === "null") {
        setFileName("");
      } else {
        setFileName(lastword);
      }
    });
  }, []);

  if (movie === null) {
    return <Spinner />;
  }

  function handleModifyClick() {
    axios
      .putForm("/api/movie/edit", {
        id: movie.id,
        title: movie.title,
        content: movie.content,
        genre: movie.genre,
        runningTime: movie.runningTime,
        rating: movie.rating,
        startDate: movie.startDate.toISOString().split("T")[0],
        director: movie.director,
        actors: movie.actors,
        type: movieTypes,
        file: addFile,
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

  function splitFileName(value) {
    const parts = value.split("\\");
    const lastword = parts[parts.length - 1];
    return lastword;
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
            <Box>
              <FormControl>
                <FormLabel>이미지</FormLabel>
                <Flex border={"1px solid black"} alignItems={"center"}>
                  <Button onClick={() => fileRef.current.click()}>
                    파일 선택
                  </Button>
                  <Input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setFileName(splitFileName(e.target.value));
                      setAddFile(e.target.files[0]);
                    }}
                    hidden={"_hidden"}
                  />
                  {fileName && <Box>{fileName}</Box>}
                </Flex>
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>영화 설명</FormLabel>
                <Textarea
                  resize={"none"}
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
                    ml={"3px"}
                    _checked={{
                      "& .chakra-checkbox__control": {
                        backgroundColor: "#ff4357",
                        borderColor: "#ff4357",
                        _hover: {
                          backgroundColor: "#ff4357",
                        },
                      },
                    }}
                    value="2D"
                    onChange={(e) =>
                      handleMovieType(e.target.value, e.target.checked)
                    }
                  >
                    2D
                  </Checkbox>
                  <Checkbox
                    _checked={{
                      "& .chakra-checkbox__control": {
                        backgroundColor: "#ff4357",
                        borderColor: "#ff4357",
                        _hover: {
                          backgroundColor: "#ff4357",
                        },
                      },
                    }}
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
                  defaultValue={movie.rating}
                  placeholder={"예) 18세관람가(청소년관람불가)"}
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
              <Button
                bgColor={"dimgray"}
                color={"white"}
                _hover={{
                  bgColor: "gray",
                }}
                onClick={handleCancelClick}
              >
                취소
              </Button>
              <ColorButton onClick={onOpen} colorScheme={"blue"}>
                수정
              </ColorButton>
            </Box>
          </Stack>
        </Box>
      </CenterBox>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent _dark={{ bgColor: "#1F3032" }}>
          <ModalHeader>수정 확인</ModalHeader>
          <ModalBody>수정 하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button
              bgColor={"dimgray"}
              color={"white"}
              _hover={{
                bgColor: "gray",
              }}
              onClick={onClose}
            >
              취소
            </Button>
            <ColorButton onClick={handleModifyClick} colorScheme={"blue"}>
              수정
            </ColorButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}

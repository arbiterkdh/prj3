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
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  Table,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import CenterBox from "../../../css/theme/component/box/CenterBox.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import CenterTd from "../../../css/theme/component/table/thead/tr/td/CenterTd.jsx";
import ColorButton from "../../../css/theme/component/button/ColorButton.jsx";

export function MovieAdd() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState([]);
  const [content, setContent] = useState("");
  const [genre, setGenre] = useState("");
  const [runningTime, setRunningTime] = useState(0);
  const [movieType, setMovieType] = useState([]);
  const [rating, setRating] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [director, setDirector] = useState("");
  const [actors, setActors] = useState("");
  const [alphabet, setAlphabet] = useState("");
  const [number, setNumber] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [movieList, setMovieList] = useState([]);

  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const kmdbKey = import.meta.env.VITE_KMDb_APP_KEY;

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
        alphabet,
        number,
      })
      .then(() => navigate("/movie"));
  }

  const kmdbUrl =
    "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=N";

  // kmdb에서 영화 검색...
  function handleSearchClick() {
    axios
      .get(`${kmdbUrl}&title=${searchKeyword}&ServiceKey=${kmdbKey}`)
      .then((res) => {
        if (res.data.TotalCount > 0) {
          setMovieList(res.data.Data[0].Result);
        }
      });
  }

  // 검색한 영화를 선택했을때 데이터 삽입...
  function handleMovieSelect(movieId, movieSeq) {
    axios
      .get(
        `${kmdbUrl}&movieId=${movieId}&movieSeq=${movieSeq}&ServiceKey=${kmdbKey}`,
      )
      .then((res) => {
        setTitle(res.data.Data[0].Result[0].title.trim());
        setContent(res.data.Data[0].Result[0].plots.plot[0].plotText);
        setGenre(res.data.Data[0].Result[0].genre.trim());
        setRunningTime(res.data.Data[0].Result[0].runtime.trim());
        setRating(res.data.Data[0].Result[0].rating.trim());
        setDirector(
          selectDirectorName(res.data.Data[0].Result[0].directors.director),
        );
        setActors(selectActorsName(res.data.Data[0].Result[0].actors.actor));
        setAlphabet(movieId);
        setNumber(movieSeq);
      })
      .finally(onClose);
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
  if (rating.length === 0) {
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

  function titleText(title, prodYear) {
    return title.replace(/!HS|!HE/g, "") + " " + prodYear;
  }

  function selectDirectorName(director) {
    let directorsName = "";
    for (let i = 0; i < director.length; i++) {
      directorsName += director[i].directorNm;
      if (i !== director.length - 1) {
        directorsName += ", ";
      }
    }
    return directorsName;
  }

  function selectActorsName(actor) {
    let actorListLength = 0;
    if (actor.length > 5) {
      actorListLength = 5;
    } else {
      actorListLength = actor.length;
    }
    let actorsName = "";
    for (let i = 0; i < actorListLength; i++) {
      actorsName += actor[i].actorNm;
      if (i !== actorListLength - 1) {
        actorsName += ", ";
      }
    }
    return actorsName;
  }

  return (
    <Center>
      <CenterBox>
        <Flex>
          <Heading mb={10}>영화 추가</Heading>
          <Spacer />
          <ColorButton
            onClick={onOpen}
            rightIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
          >
            영화검색
          </ColorButton>
        </Flex>
        <Box>
          <Stack>
            <Box>
              <FormControl>
                <FormLabel>제목</FormLabel>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>이미지</FormLabel>
                <Input
                  alignContent={"center"}
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
                  value={content}
                  border={"1px solid black"}
                  resize={"none"}
                  placeholder={"영화 내용을 입력해주세요."}
                  onChange={(e) => setContent(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>장르</FormLabel>
                <Input
                  value={genre}
                  placeholder=", 로 구분"
                  onChange={(e) => setGenre(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>상영시간</FormLabel>
                <Input
                  value={runningTime !== 0 ? runningTime : null}
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
                  value={rating}
                  placeholder={"예) 18세관람가(청소년관람불가)"}
                  onChange={(e) => setRating(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>개봉일</FormLabel>
                <Box ml={"3px"}>
                  <DatePicker
                    locale={ko}
                    dateFormat="yyyy년 MM월 dd일"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </Box>
              </FormControl>
            </Box>
            <Box>
              <FormControl>감독</FormControl>
              <Input
                value={director}
                onChange={(e) => setDirector(e.target.value)}
              />
            </Box>
            <Box>
              <FormControl>출연진</FormControl>
              <Input
                value={actors}
                onChange={(e) => setActors(e.target.value)}
              />
            </Box>
            <Box hidden={"_hidden"}>
              <Input
                value={alphabet}
                onChange={(e) => setAlphabet(e.target.value)}
              />
              <Input
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </Box>
            <Box>
              <Button
                bgColor={"dimgray"}
                color={"white"}
                _hover={{
                  bgColor: "gray",
                }}
                onClick={handleMovieCancel}
              >
                취소
              </Button>
              <ColorButton
                isDisabled={disableSaveButton}
                onClick={handleMovieSave}
              >
                저장
              </ColorButton>
            </Box>
          </Stack>
        </Box>
      </CenterBox>
      {/* 영화 추가용 검색창 */}
      <Modal
        size={"lg"}
        scrollBehavior={"inside"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent _dark={{ bgColor: "#1F3032" }}>
          <ModalHeader>영화검색</ModalHeader>
          <ModalBody>
            <InputGroup mb={5} w={"100%"} size="md">
              <Input
                border={"3px solid #FF4357"}
                borderRadius={"20px"}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="영화명 검색"
              />
              <InputRightElement width="4.5rem">
                <Button
                  bgColor={"white"}
                  _hover={{
                    bgColor: "white",
                  }}
                  _dark={{
                    color: "lightgray",
                    bgColor: "#121212",
                    _hover: {
                      bgColor: "#121212",
                    },
                  }}
                  onClick={handleSearchClick}
                  h="1.75rem"
                  size="md"
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </Button>
              </InputRightElement>
            </InputGroup>
            {movieList.length !== 0 && (
              <Table>
                <Thead>
                  <Tr>
                    <Th>No.</Th>
                    <Th textAlign={"center"}>제목</Th>
                    <Th textAlign={"center"}>선택</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {movieList.map((movie, index) => (
                    <Tr key={index + 1}>
                      <Td>{index + 1}</Td>
                      <Td>
                        <a
                          style={{ cursor: "pointer" }}
                          href={movie.kmdbUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {titleText(movie.title, movie.prodYear)}
                        </a>
                      </Td>
                      <CenterTd>
                        <ColorButton
                          onClick={() =>
                            handleMovieSelect(movie.movieId, movie.movieSeq)
                          }
                        >
                          선택
                        </ColorButton>
                      </CenterTd>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              bgColor={"dimgray"}
              color={"white"}
              _hover={{
                bgColor: "gray",
              }}
              onClick={onClose}
            >
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}

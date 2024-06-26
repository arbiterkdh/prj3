import {
  Box,
  Button,
  CloseButton,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  faCouch,
  faDoorOpen,
  faLeftLong,
  faRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BorderBox from "../../../css/theme/component/box/BorderBox.jsx";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import EmptySeatBox from "../../../css/theme/component/box/EmptySeatBox.jsx";
import GapFlex from "../../../css/theme/component/flex/GapFlex.jsx";

export function TheaterSeatList() {
  const { setBookProgress } = useOutletContext();
  const location = useLocation();
  const [bookPlaceTime, setBookPlaceTime] = useState(
    location.state.bookPlaceTime,
  );
  const [movie, setMovie] = useState([]);
  const [theater, setTheater] = useState([]);
  const [theaterBox, setTheaterBox] = useState([]);
  const [theaterBoxMovie, setTheaterBoxMovie] = useState([]);

  const [movieInfoButton, setMovieInfoButton] = useState(true);

  const [checkedSeat, setCheckedSeat] = useState({ alphabet: "", seat: 0 });
  const [mouseLocation, setMouseLocation] = useState(null);
  const [seatFocused, setSeatFocused] = useState("");

  const navigate = useNavigate();

  let seatList = [];
  let ASCII_A = "A".charCodeAt(0);
  for (let i = 0; i < 10; i++) {
    const alphabet = String.fromCharCode(ASCII_A + i);
    if (alphabet === "A" || alphabet === "J") {
      seatList.push({ alphabet, seat: [] });
      for (let j = 0; j < 18; j++) {
        seatList[i].seat.push(j + 1);
      }
    } else {
      seatList.push({ alphabet, seat: [] });
      for (let j = 0; j < 22; j++) {
        seatList[i].seat.push(j + 1);
      }
    }
  }

  useEffect(() => {
    setBookProgress(2);
    if (bookPlaceTime) {
      axios
        .get(`/api/book/theaterseat/${bookPlaceTime.bookPlaceTimeId}`)
        .then((res) => {
          console.log(res.data.movie);
          setMovie(res.data.movie);
          setTheater(res.data.theater);
          setTheaterBox(res.data.theaterBox);
          setTheaterBoxMovie(res.data.theaterBoxMovie);
        });
    }
  }, []);

  function handleSeatSelect(alphabet, number) {
    if (alphabet !== "A" && alphabet !== "J") {
      if (number > 15) {
        number -= 2;
      } else if (number > 7) {
        number -= 1;
      }
    } else if (alphabet === "J" && number > 4) {
      number -= 10;
    }
    return setSeatFocused(alphabet + "-" + number);
  }

  return (
    <Box>
      <BorderBox alignContent={"center"} textAlign={"center"} h={"50px"}>
        <Flex justifyContent={"space-between"} m={1}>
          <Box></Box>
          <Box fontSize={"lg"} fontWeight={"600"} alignContent={"center"}>
            CCV {theater.location}점 인원/좌석 선택
          </Box>
          <CloseButton m={1} onClick={() => navigate("/book")}></CloseButton>
        </Flex>
      </BorderBox>
      <BorderBox h={"100px"} p={4} fontWeight={"600"}>
        <Flex align={"center"} gap={2}>
          <Stack fontSize={"16px"} gap={0} m={1}>
            <Box>{"상영시간: "}</Box>
            <Box>
              {bookPlaceTime.startTime.slice(11, 16)}~
              {bookPlaceTime.endTime.slice(11, 16)}
            </Box>
          </Stack>
          <Stack gap={0} m={1}>
            <Box>{"좌석: "}</Box>
            <Box>
              {bookPlaceTime.vacancy}/{theaterBox.capacity}
            </Box>
          </Stack>
          <Box>
            <GapFlex align={"center"}>
              <Box w={"60px"}>인원: </Box>
              <InputGroup>
                <NumberInput size="md" maxW={20} defaultValue={0} min={0}>
                  <NumberInputField
                    p={2}
                    border={"1px solid"}
                    borderRadius={"none"}
                    fontSize={"16px"}
                    _focusVisible={{
                      border: "2px solid gray",
                    }}
                  />
                  <NumberInputStepper borderLeft={"1px solid"}>
                    <NumberIncrementStepper borderBottom={"1px solid"} />
                    <NumberDecrementStepper
                      _disabled={{ cursor: "default" }}
                      borderTop={"1px solid"}
                    />
                  </NumberInputStepper>
                </NumberInput>
                <InputRightElement mx={8} h={"35px"}>
                  명
                </InputRightElement>
              </InputGroup>
            </GapFlex>
          </Box>

          <InputGroup w={"150px"}>
            <Input
              defaultValue={0}
              textAlign={"right"}
              readOnly
              border={"none"}
              bgColor={"whiteAlpha.50"}
            />
            <InputRightElement>원</InputRightElement>
          </InputGroup>

          <Box>
            <Button p={2}>좌석선택</Button>
          </Box>
        </Flex>
      </BorderBox>
      <Button
        position={"absolute"}
        size={"sm"}
        zIndex={4}
        top={"420px"}
        left={"1330px"}
        bgColor={"whiteAlpha.700"}
        _dark={{
          bgColor: "whiteAlpha.300",
          _hover: {
            bgColor: "whiteAlpha.500",
          },
        }}
        onClick={() => setMovieInfoButton(!movieInfoButton)}
      >
        {movieInfoButton ? "좌석먼저보기" : "영화소개보기"}
      </Button>
      <Flex
        zIndex={movieInfoButton ? 3 : 0}
        display={movieInfoButton ? "flex" : "none"}
        position={"absolute"}
        w={"880px"}
        h={"551px"}
        border={"1px solid"}
        align={"center"}
        boxShadow={"inset 0 0 35px rgba(0, 0, 0, 1)"}
        bgColor={"rgba(17, 35, 37, 0.95)"}
        _dark={{
          bgColor: "blackAlpha.800",
          boxShadow: "inset 0 0 35px rgba(45, 45, 45, 1)",
        }}
      >
        <Box m={8} w={"380px"}>
          {movie ? (
            <Image
              src={movie.movieImageFile}
              maxH={"476px"}
              _dark={{
                filter: "brightness(80%)",
              }}
            />
          ) : (
            <Spinner></Spinner>
          )}
        </Box>
        <Box m={8} w={"440px"} h={"500px"} color={"whiteAlpha.800"}>
          <Heading mx={-5} my={8}>
            {movie.title}
          </Heading>
          <Heading mx={-2} mt={4} fontSize={"lg"}>
            줄거리
          </Heading>
          <Text pr={5} whiteSpace={"pre-wrap"} h={"220px"} overflowY={"scroll"}>
            {movie.content}
          </Text>
          <Stack>
            <Box m={-3} mt={5} fontSize={"lg"} fontWeight={"600"}>
              감독: {movie.director}
            </Box>
            <Box noOfLines={1}>출연진: {movie.actors}</Box>
            <Box>장르: {movie.genre}</Box>
            <Flex>
              <Box w={"100%"}>수위: {movie.rating}</Box>
              <Box w={"100%"}>평점: 9.0 </Box>
            </Flex>
          </Stack>
        </Box>
      </Flex>
      <BorderBox
        h={"150px"}
        display={"flex"}
        justifyContent={"center"}
        bgColor={"blackAlpha.500"}
        borderBottom={0}
      >
        <Box
          mt={"-42px"}
          sx={{
            width: "535px",
            height: "192px",
            bgColor: "whiteAlpha.400",
            transform: "perspective(500px) rotateX(-58deg)",
            transformOrigin: "bottom",
          }}
          borderX={"1px solid"}
          color={"blackAlpha.500"}
          align={"center"}
          zIndex={1}
        >
          <Box
            mt={"25px"}
            sx={{
              width: "380px",
              height: "120px",
              bgColor: "whiteAlpha.500",
              transform: "perspective(500px) rotateX(-20deg)",
              transformOrigin: "bottom",
            }}
          >
            <Box
              sx={{
                width: "380px",
                height: "50px",
                color: "darkslategray",
                _dark: { color: "red.900" },
                transform: "perspective(100px) rotateX(15deg)",
                transformOrigin: "bottom",
              }}
              fontSize={"6xl"}
            >
              {seatFocused && seatFocused}
            </Box>
          </Box>
        </Box>
      </BorderBox>
      <BorderBox
        w={"880px"}
        h={"400px"}
        display={"flex"}
        justifyContent={"center"}
        align={"center"}
        borderY={0}
      >
        <Box
          mt={"11px"}
          w={"860px"}
          h={"25px"}
          borderX={"10px solid"}
          borderY={"1px solid"}
          borderRadius={"10px"}
          color={"blackAlpha.600"}
          bgColor={"whiteAlpha.600"}
          _dark={{ bgColor: "dimgray" }}
          zIndex={1}
          position={"absolute"}
          justifyContent={"space-between"}
          display={"flex"}
          alignItems={"center"}
          p={1}
        >
          <Box>
            <FontAwesomeIcon icon={faDoorOpen} color={"black"} />
            <FontAwesomeIcon icon={faLeftLong} color={"black"} />
          </Box>
          <Box>
            <FontAwesomeIcon icon={faRightLong} color={"black"} />
            <FontAwesomeIcon icon={faDoorOpen} color={"black"} />
          </Box>
        </Box>
        <Box
          w={"880px"}
          position={"absolute"}
          bgColor={"blackAlpha.500"}
          h={"400px"}
        ></Box>
        <Box
          borderTop={"1px solid"}
          color={"blackAlpha.600"}
          clipPath={`polygon(0% 0%, 95% 0%, 100% 100%, 0% 100%, 5% 0%)`}
          borderTopLeftRadius={"70px"}
          borderTopRightRadius={"70px"}
          w={"660px"}
          h={"400px"}
          bgColor={"whitesmoke"}
          _dark={{ bgColor: "gray" }}
          zIndex={2}
        >
          <Box h={"368px"} color={"blackAlpha.600"}>
            <Flex pt={"55px"} w={"530px"} h={"280px"}>
              <Stack align={"center"}>
                {seatList.map((row, index) => (
                  <Flex key={index}>
                    {row.alphabet === "D" && (
                      <Flex>
                        <Box h={"30px"} />
                      </Flex>
                    )}
                    {row.seat.map((col, index) => (
                      <Box key={index}>
                        {index === 0 && row.alphabet === "A" ? (
                          <Flex>
                            <EmptySeatBox />
                            <EmptySeatBox>
                              <FontAwesomeIcon
                                cursor={"pointer"}
                                onMouseEnter={() =>
                                  handleSeatSelect(row.alphabet, col)
                                }
                                onMouseLeave={() => setSeatFocused("")}
                                icon={faCouch}
                              />
                            </EmptySeatBox>
                          </Flex>
                        ) : index === 17 && row.alphabet === "A" ? (
                          <Flex>
                            <EmptySeatBox>
                              <FontAwesomeIcon
                                cursor={"pointer"}
                                onMouseEnter={() =>
                                  handleSeatSelect(row.alphabet, col)
                                }
                                onMouseLeave={() => setSeatFocused("")}
                                icon={faCouch}
                              />
                            </EmptySeatBox>
                            <EmptySeatBox />
                          </Flex>
                        ) : (index === 5 || index === 13) &&
                          row.alphabet === "A" ? (
                          <Flex>
                            <EmptySeatBox />
                            <EmptySeatBox>
                              <FontAwesomeIcon
                                cursor={"pointer"}
                                onMouseEnter={() =>
                                  handleSeatSelect(row.alphabet, col)
                                }
                                onMouseLeave={() => setSeatFocused("")}
                                icon={faCouch}
                              />
                            </EmptySeatBox>
                          </Flex>
                        ) : index > 3 && index < 14 && row.alphabet === "J" ? (
                          <EmptySeatBox />
                        ) : index === 14 && row.alphabet === "J" ? (
                          <Flex>
                            <EmptySeatBox />
                            <EmptySeatBox />
                            <EmptySeatBox />
                            <EmptySeatBox />
                            <EmptySeatBox>
                              <FontAwesomeIcon
                                cursor={"pointer"}
                                onMouseEnter={() =>
                                  handleSeatSelect(row.alphabet, col)
                                }
                                onMouseLeave={() => setSeatFocused("")}
                                icon={faCouch}
                              />
                            </EmptySeatBox>
                          </Flex>
                        ) : (index === 6 || index === 15) &&
                          row.alphabet !== "A" &&
                          row.alphabet !== "J" ? (
                          <EmptySeatBox />
                        ) : (
                          <EmptySeatBox>
                            <FontAwesomeIcon
                              cursor={"pointer"}
                              onMouseEnter={() =>
                                handleSeatSelect(row.alphabet, col)
                              }
                              onMouseLeave={() => setSeatFocused("")}
                              icon={faCouch}
                            />
                          </EmptySeatBox>
                        )}
                      </Box>
                    ))}
                  </Flex>
                ))}
              </Stack>
            </Flex>
          </Box>
        </Box>
      </BorderBox>
    </Box>
  );
}

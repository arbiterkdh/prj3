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
  useToast,
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

  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [seatFocused, setSeatFocused] = useState("");
  const [seatSelected, setSeatSelected] = useState([]);
  const [seatBooked, setSeatBooked] = useState([]);

  const navigate = useNavigate();
  const toast = useToast();

  let seatList = [];
  let ASCII_A = "A".charCodeAt(0);

  for (let i = 0; i < 10; i++) {
    const alphabet = String.fromCharCode(ASCII_A + i);
    seatList.push({ alphabet, seat: [] });
    for (let j = 0; j < 22; j++) {
      seatList[i].seat.push(j + 1);
    }
  }

  useEffect(() => {
    setBookProgress(2);
    if (bookPlaceTime) {
      axios
        .get(`/api/book/theaterseat/${bookPlaceTime.bookPlaceTimeId}`)
        .then((res) => {
          console.log(res.data);
          setMovie(res.data.movie);
          setTheater(res.data.theater);
          setTheaterBox(res.data.theaterBox);
          setTheaterBoxMovie(res.data.theaterBoxMovie);
          setSeatBooked(res.data.rowColList);
        });
    }
  }, []);

  function handleSeatFocus(alphabet, number) {
    return setSeatFocused(alphabet + "-" + number);
  }

  function handleSeatSelect(alphabet, number) {
    if (numberOfPeople === 0) {
      toast({
        status: "warning",
        description: "인원을 먼저 선택해주세요.",
        position: "bottom-right",
      });
      return;
    }

    let seatSelectedList = [...seatSelected];

    if (!seatSelectedList.includes(alphabet + "-" + number)) {
      if (seatSelected.length === numberOfPeople) {
        toast({
          status: "warning",
          description: "더 이상 선택할 수 없습니다.",
          position: "bottom-right",
        });
        return;
      }
      seatSelectedList.push(alphabet + "-" + number);
    } else {
      seatSelectedList = seatSelectedList.filter(
        (seat) => seat !== alphabet + "-" + number,
      );
    }
    return setSeatSelected(seatSelectedList);
  }

  return (
    <Box>
      <BorderBox alignContent={"center"} textAlign={"center"} h={"50px"}>
        <Flex justifyContent={"space-between"} m={1}>
          <Box></Box>
          <Box fontSize={"lg"} fontWeight={"600"} alignContent={"center"}>
            CCV {theater.location}점 {theaterBox.boxNumber}관 인원/좌석 선택
          </Box>
          <CloseButton m={1} onClick={() => navigate("/book")} />
        </Flex>
      </BorderBox>
      <BorderBox
        alignContent={"center"}
        h={"100px"}
        pl={4}
        pr={0}
        fontWeight={"600"}
      >
        <Flex columnGap={4}>
          <Flex align={"center"} gap={4}>
            <Flex fontSize={"16px"} gap={2}>
              <Box fontSize={"18px"}>{"상영시간: "}</Box>
              <Box>
                {bookPlaceTime.startTime.slice(11, 16)}~
                {bookPlaceTime.endTime.slice(11, 16)}
              </Box>
            </Flex>
            <Flex gap={2}>
              <Box fontSize={"18px"}>{"좌석: "}</Box>
              <Box>
                {bookPlaceTime.vacancy}/{theaterBox.capacity}
              </Box>
            </Flex>
            <Box>
              <Flex gap={2} align={"center"}>
                <Box w={"60px"} fontSize={"18px"}>
                  인원:{" "}
                </Box>
                <InputGroup>
                  <NumberInput
                    size="sm"
                    maxW={20}
                    min={0}
                    max={bookPlaceTime.vacancy}
                    value={numberOfPeople}
                    onChange={(e) => {
                      let prevPeopleCount = Number(numberOfPeople);
                      if (
                        prevPeopleCount > Number(e) &&
                        seatSelected.length === prevPeopleCount
                      ) {
                        let newSeatSelected = [...seatSelected];
                        newSeatSelected.pop();
                        setSeatSelected(newSeatSelected);
                      }
                      setNumberOfPeople(Number(e));
                      setTotalAmount(e * 14000);
                    }}
                    allowMouseWheel
                  >
                    <NumberInputField
                      p={2}
                      border={"1px solid"}
                      borderRadius={"none"}
                      fontSize={"16px"}
                      _focusVisible={{
                        border: "2px solid gray",
                      }}
                      readOnly
                    />
                    <NumberInputStepper borderLeft={"1px solid"}>
                      <NumberIncrementStepper
                        _disabled={{ cursor: "default" }}
                        borderBottom={"1px solid"}
                      />
                      <NumberDecrementStepper
                        _disabled={{ cursor: "default" }}
                        borderTop={"1px solid"}
                      />
                    </NumberInputStepper>
                  </NumberInput>
                  <InputRightElement h={"25px"} mr={9} fontSize={"14px"}>
                    명
                  </InputRightElement>
                </InputGroup>
              </Flex>
            </Box>

            <InputGroup w={"120px"} ml={-8} mr={-4} size={"sm"}>
              <Input
                value={
                  numberOfPeople > 71
                    ? (numberOfPeople * 14 + "").slice(0, 1) +
                      "," +
                      (numberOfPeople * 14 + "").slice(1, 4) +
                      ",000"
                    : numberOfPeople > 0
                      ? numberOfPeople * 14 + ",000"
                      : 0
                }
                textAlign={"right"}
                border={"none"}
                bgColor={"whiteAlpha.50"}
                fontSize={"16px"}
                readOnly
              />
              <InputRightElement>원</InputRightElement>
            </InputGroup>

            <Box>
              <Button p={2} size={"sm"}>
                좌석선택
              </Button>
            </Box>
          </Flex>
          <Flex
            bgColor={"gray.200"}
            _dark={{ bgColor: "blackAlpha.400" }}
            w={"200px"}
            h={"90px"}
            overflowY={"scroll"}
            flexWrap={"wrap"}
            alignContent={"start"}
            p={1}
            pl={2}
            columnGap={1}
          >
            {numberOfPeople === 0 ? (
              <Box>인원을 선택해주세요.</Box>
            ) : seatSelected.length > 0 ? (
              seatSelected.map((selectedSeat, index) => (
                <Flex
                  key={index}
                  h={"20px"}
                  w={"53px"}
                  align={"center"}
                  justifyContent={"space-between"}
                  gap={"3px"}
                >
                  <Box w={"40px"} h={"24px"} textAlign={"right"}>
                    {selectedSeat}
                  </Box>
                  <CloseButton
                    w={"12px"}
                    h={"12px"}
                    borderRadius={"none"}
                    border={"1px solid"}
                    _hover={{
                      opacity: "0.6",
                    }}
                    onClick={() => {
                      setSeatSelected((prevSeats) => {
                        return prevSeats.filter((_, idx) => idx !== index);
                      });
                    }}
                  />
                </Flex>
              ))
            ) : (
              <Box>좌석을 선택해주세요.</Box>
            )}
          </Flex>
        </Flex>
      </BorderBox>
      <Box w={"880px"} position={"absolute"}>
        <Button
          m={2}
          size={"sm"}
          zIndex={4}
          left={"89%"}
          bgColor={"whiteAlpha.700"}
          _dark={{
            bgColor: "whiteAlpha.300",
            _hover: {
              bgColor: "whiteAlpha.500",
            },
          }}
          onClick={() => setMovieInfoButton(!movieInfoButton)}
        >
          {movieInfoButton ? "좌석보기" : "영화소개"}
        </Button>
      </Box>

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
            <Spinner />
          )}
        </Box>
        <Box m={8} w={"440px"} h={"500px"} color={"whiteAlpha.800"}>
          <Heading mx={-5} my={8}>
            {movie.title}
          </Heading>
          <Heading mx={-2} mt={4} fontSize={"lg"}>
            줄거리
          </Heading>
          <Text
            pr={5}
            mb={3}
            whiteSpace={"pre-wrap"}
            h={"190px"}
            overflowY={"scroll"}
          >
            {movie.content}
          </Text>
          <Stack>
            <Box mx={-3} mt={4} fontSize={"lg"} fontWeight={"600"}>
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
              {seatFocused}
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
          w={"878px"}
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
                {seatList.map((row, index) => {
                  return (
                    <Flex key={index}>
                      {row.alphabet === "D" && (
                        <Flex>
                          <Box h={"30px"} />
                        </Flex>
                      )}
                      {row.seat.map((col, index) => {
                        let rowCol = row.alphabet + "-" + col;
                        return (
                          <Box key={index}>
                            {rowCol === "A-1" || rowCol === "A-22" ? (
                              <EmptySeatBox />
                            ) : index > 3 &&
                              index < 18 &&
                              row.alphabet === "J" ? (
                              <EmptySeatBox />
                            ) : index === 6 || index === 15 ? (
                              <EmptySeatBox />
                            ) : (
                              <EmptySeatBox
                                color={
                                  seatFocused === rowCol ||
                                  seatSelected.includes(rowCol)
                                    ? "darkslategray"
                                    : ""
                                }
                                _dark={
                                  seatFocused === rowCol ||
                                  seatSelected.includes(rowCol)
                                    ? { color: "red.800" }
                                    : {}
                                }
                              >
                                <FontAwesomeIcon
                                  cursor={"pointer"}
                                  onMouseEnter={() =>
                                    handleSeatFocus(row.alphabet, col)
                                  }
                                  onMouseLeave={() => {
                                    setSeatFocused("");
                                  }}
                                  onClick={() =>
                                    handleSeatSelect(row.alphabet, col)
                                  }
                                  icon={faCouch}
                                />
                              </EmptySeatBox>
                            )}
                          </Box>
                        );
                      })}
                    </Flex>
                  );
                })}
              </Stack>
            </Flex>
          </Box>
        </Box>
      </BorderBox>
    </Box>
  );
}

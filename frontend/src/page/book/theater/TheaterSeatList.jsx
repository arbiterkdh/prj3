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
  faCreditCard,
  faDoorOpen,
  faLeftLong,
  faPerson,
  faRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BorderBox from "../../../css/theme/component/box/BorderBox.jsx";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import EmptySeatBox from "../../../css/theme/component/box/EmptySeatBox.jsx";
import SmallFontBox from "../../../css/theme/component/box/SmallFontBox.jsx";
import { LoginContext } from "../../../component/LoginProvider.jsx";
import ColorButton from "../../../css/theme/component/button/ColorButton.jsx";

export function TheaterSeatList() {
  const { setBookProgress } = useOutletContext();
  const account = useContext(LoginContext);
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const timerRef = useRef(null);

  const [timer, setTimer] = useState(10 * 60);

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
  const [seatPaid, setSeatPaid] = useState([]);

  const [updatingSeat, setUpdatingSeat] = useState("");
  const [isSelecting, setIsSelecting] = useState(false);
  const [clickedCloseButton, setClickedCloseButton] = useState(-1);

  useEffect(() => {
    if (seatSelected.length > 0 && timer === 10 * 60) {
      startTimer();
    } else if (seatSelected.length === 0) {
      resetTimer();
    }
  }, [seatSelected]);

  useEffect(() => {
    if (timer === 0) {
      resetPage();
    }
  }, [timer]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `/api/book/theaterseat?bookplacetimeid=${bookPlaceTime.bookPlaceTimeId}&bookseatmembernumber=${account.id}`,
        );
        setMovie(res.data.movie);
        setTheater(res.data.theater);
        setTheaterBox(res.data.theaterBox);
        setTheaterBoxMovie(res.data.theaterBoxMovie);
        setBookPlaceTime(res.data.bookPlaceTime);
        let prevSelectedList = res.data.selectedList;
        let rowColList = res.data.rowColList;

        if (prevSelectedList.length > 0) {
          setSeatSelected(
            prevSelectedList.sort((a, b) => {
              let alphabetA = a.charCodeAt(0);
              let alphabetB = b.charCodeAt(0);
              if (alphabetA !== alphabetB) {
                return alphabetA - alphabetB;
              } else {
                return Number(a.slice(2, 4)) - Number(b.slice(2, 4));
              }
            }),
          );
          setNumberOfPeople(prevSelectedList.length);
          setTotalAmount(prevSelectedList.length * 14000);

          let exceptSelectedRowColList = rowColList.filter(
            (rowCol) => !prevSelectedList.includes(rowCol),
          );
          setSeatBooked(exceptSelectedRowColList);
        } else {
          setSeatBooked(rowColList);
        }
      } catch (err) {
        console.error(err);
      }
    }

    if (!account.isLoggedIn()) {
      navigate("/");
    } else {
      setBookProgress(2);
      if (bookPlaceTime) {
        fetchData();
      }
    }
  }, []);

  function timeFormat(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  function startTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
  }

  function resetTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimer(10 * 60);
  }

  function resetPage() {
    resetTimer();
    toast({
      status: "info",
      description: "예매 유효 시간이 초과되어, 홈으로 이동됩니다.",
      position: "bottom-right",
    });
    handleClickRemoveBookSeatData(account.id, bookPlaceTime.bookPlaceTimeId);
    return navigate("/");
  }

  function handleSeatFocus(alphabet, number) {
    return setSeatFocused(alphabet + "-" + number);
  }

  async function handleSeatSelect(alphabet, number, bookSeatMemberNumber) {
    if (numberOfPeople === 0) {
      toast({
        status: "warning",
        description: "인원을 먼저 선택해주세요.",
        position: "bottom-right",
      });
      setIsSelecting(false);
      return;
    }

    let seatSelectedList = [...seatSelected];
    let rowCol = alphabet + "-" + number;

    if (
      !seatSelectedList.includes(rowCol) &&
      seatSelected.length === numberOfPeople
    ) {
      toast({
        status: "warning",
        description: "더 이상 선택할 수 없습니다.",
        position: "bottom-right",
      });
    } else {
      setUpdatingSeat(rowCol);
      try {
        const response = await axios.post("/api/book/theaterseat/state", {
          bookPlaceTimeId: bookPlaceTime.bookPlaceTimeId,
          rowCol,
          bookSeatMemberNumber,
        });
        const rowColList = response.data.rowColList;
        setBookPlaceTime(response.data.bookPlaceTime);
        if (rowColList.includes(rowCol)) {
          setSeatSelected((prev) => {
            let newSeatSelected = [...prev];
            newSeatSelected.push(rowCol);
            return newSeatSelected.sort((a, b) => {
              let alphabetA = a.charCodeAt(0);
              let alphabetB = b.charCodeAt(0);
              if (alphabetA !== alphabetB) {
                return alphabetA - alphabetB;
              } else {
                return Number(a.slice(2, 4)) - Number(b.slice(2, 4));
              }
            });
          });
        } else {
          setSeatSelected((prev) => {
            let newSeatSelected = [...prev];
            newSeatSelected = newSeatSelected.filter((seat) => seat !== rowCol);
            return newSeatSelected;
          });
        }
        setUpdatingSeat("");
      } catch (err) {
        if (err.response.status === 504) {
          toast({
            status: "warning",
            description: "예매 가능 시간이 초과되었습니다.",
            position: "bottom-right",
          });
          navigate("/book");
        } else if (err.response.status === 409) {
          toast({
            status: "warning",
            description: "예매중이거나, 예매된 좌석입니다.",
            position: "bottom-right",
          });
          setSeatBooked(err.response.data);
          setSeatSelected((prev) => prev.filter((seat) => seat !== rowCol));
        }
        setUpdatingSeat("");
      }
    }
    setIsSelecting(false);
  }

  function handleClickRemoveBookSeatData(
    bookSeatMemberNumber,
    bookPlaceTimeId,
  ) {
    axios.delete(
      `/api/book/theaterseat/delete?bookseatmembernumber=${bookSeatMemberNumber}&bookplacetimeid=${bookPlaceTimeId}`,
    );
  }

  let seatList = [];
  let ASCII_A = "A".charCodeAt(0);

  for (let i = 0; i < 10; i++) {
    const alphabet = String.fromCharCode(ASCII_A + i);
    seatList.push({ alphabet, seat: [] });
    for (let j = 0; j < 22; j++) {
      seatList[i].seat.push(j + 1);
    }
  }

  return (
    <Box position={"relative"}>
      <BorderBox alignContent={"center"} textAlign={"center"} h={"50px"}>
        <Flex justifyContent={"space-between"} m={1}>
          <Box />
          <Box fontSize={"lg"} fontWeight={"600"} alignContent={"center"}>
            CCV {theater.location}점 {theaterBox.boxNumber}관 인원/좌석 선택
          </Box>
          <CloseButton
            m={1}
            onClick={() => {
              handleClickRemoveBookSeatData(
                account.id,
                bookPlaceTime.bookPlaceTimeId,
              );
              navigate("/book");
            }}
          />
        </Flex>
      </BorderBox>
      <BorderBox
        alignContent={"center"}
        h={"100px"}
        pl={4}
        pr={0}
        fontWeight={"600"}
      >
        <Flex columnGap={4} justifyContent={"space-between"}>
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
              <Box w={"60px"}>
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
                    max={
                      bookPlaceTime.vacancy < 12 ? bookPlaceTime.vacancy : 13
                    }
                    value={numberOfPeople}
                    isDisabled={isSelecting}
                    _disabled={{ cursor: "default" }}
                    onChange={(e) => {
                      if (Number(e) === 13) {
                        toast({
                          status: "info",
                          description: "선택 가능한 인원은 최대 12명입니다.",
                          position: "bottom-right",
                        });
                        return 12;
                      }
                      let prevPeopleCount = Number(numberOfPeople);
                      if (
                        prevPeopleCount > Number(e) &&
                        seatSelected.length === prevPeopleCount
                      ) {
                        let newSeatSelected = [...seatSelected];
                        let poppedRowCol = newSeatSelected.pop().split("-");
                        setIsSelecting(true);
                        handleSeatSelect(
                          poppedRowCol[0],
                          poppedRowCol[1],
                          account.id,
                        );
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
                value={numberOfPeople > 0 ? numberOfPeople * 14 + ",000" : 0}
                textAlign={"right"}
                border={"none"}
                bgColor={"whiteAlpha.50"}
                fontSize={"16px"}
                readOnly
              />
              <InputRightElement>원</InputRightElement>
            </InputGroup>
          </Flex>
          <Flex
            bgColor={"gray.200"}
            _dark={{ bgColor: "blackAlpha.400" }}
            w={"260px"}
            h={"90px"}
            overflowY={"scroll"}
            flexWrap={"wrap"}
            alignContent={"start"}
            p={2}
            pl={2}
            mx={"5px"}
            columnGap={2}
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
                >
                  <Box w={"36px"} h={"24px"} textAlign={"center"}>
                    {selectedSeat}
                  </Box>
                  <CloseButton
                    isDisabled={clickedCloseButton === selectedSeat}
                    _disabled={{ cursor: "default" }}
                    w={"12px"}
                    h={"12px"}
                    fontSize={"10px"}
                    borderRadius={"none"}
                    border={"1px solid"}
                    _hover={{
                      opacity: "0.6",
                    }}
                    onClick={() => {
                      setClickedCloseButton(selectedSeat);

                      let rowCol = seatSelected[index].split("-");
                      let alphabet = rowCol[0];
                      let number = rowCol[1];

                      handleSeatSelect(alphabet, number, account.id);
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
      <Input
        m={2}
        size={"sm"}
        value={"남은시간: " + timeFormat(timer) + " (좌석 독점 방지)"}
        position={"absolute"}
        w={"227px"}
        zIndex={3}
        fontWeight={"600"}
        bgColor={"white"}
        border={""}
        borderRadius={"6px"}
        _dark={{ bgColor: "black" }}
        isDisabled
      />
      <Box
        display={
          movieInfoButton
            ? "none"
            : seatSelected.length > 0 && seatSelected.length === numberOfPeople
              ? "block"
              : "none"
        }
        zIndex={3}
        top={"575px"}
        left={"750px"}
        position={"absolute"}
      >
        <ColorButton
          w={"100px"}
          h={"100px"}
          fontSize={"16px"}
          rounded={"full"}
          onClick={() =>
            navigate("/book/payment", {
              state: {
                bookSeatBookPlaceTimeId: bookPlaceTime.bookPlaceTimeId,
                seatSelected: seatSelected,
                numberOfPeople: numberOfPeople,
                totalAmount: totalAmount,
                movie: movie,
                city: theater.city,
                location: theater.location,
                boxNumber: theaterBox.boxNumber,
                startTime: bookPlaceTime.startTime,
                endTime: bookPlaceTime.endTime,
              },
            })
          }
        >
          <Flex align={"center"} gap={1}>
            <Box>결제</Box>
            <FontAwesomeIcon icon={faCreditCard} beat />
          </Flex>
        </ColorButton>
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
        <Box m={8} w={"340px"}>
          {movie ? (
            <Image
              border={"1px solid"}
              color={"whiteAlpha.50"}
              src={movie.movieImageFile}
              maxH={"480px"}
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
            mb={5}
            whiteSpace={"pre-wrap"}
            h={"190px"}
            overflowY={"scroll"}
          >
            {movie.content}
          </Text>
          <Stack>
            <Box
              mx={-3}
              mt={4}
              fontSize={"lg"}
              fontWeight={"600"}
              w={"450px"}
              overflowX={"hidden"}
              whiteSpace={"nowrap"}
              textOverflow={"ellipsis"}
            >
              감독: {movie.director}
            </Box>
            <SmallFontBox noOfLines={1}>출연진: {movie.actors}</SmallFontBox>
            <SmallFontBox>장르: {movie.genre}</SmallFontBox>
            <Flex justifyContent={"space-between"}>
              <SmallFontBox w={"300px"}>수위: {movie.rating}</SmallFontBox>
              <Box w={"80px"} fontWeight={"600"}>
                평점: 9.0
              </Box>
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
        />
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
          <Box h={"368px"} color={"blackAlpha.600"} left={"288px"}>
            <Flex
              pt={"55px"}
              w={"530px"}
              h={"280px"}
              onMouseEnter={() => setSeatFocused("")}
            >
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
                        let isFocused = seatFocused === rowCol;
                        let isBooked = seatBooked.includes(rowCol);
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
                            ) : !isBooked ? (
                              <EmptySeatBox
                                color={
                                  isFocused || seatSelected.includes(rowCol)
                                    ? "darkslategray"
                                    : ""
                                }
                                _dark={
                                  isFocused || seatSelected.includes(rowCol)
                                    ? { color: "red.800" }
                                    : {}
                                }
                              >
                                {isSelecting && updatingSeat !== rowCol ? (
                                  <FontAwesomeIcon
                                    icon={faCouch}
                                    opacity={"0.4"}
                                    color={"#001514"}
                                    onMouseEnter={() => setSeatFocused("")}
                                  />
                                ) : updatingSeat !== rowCol ? (
                                  <FontAwesomeIcon
                                    cursor={"pointer"}
                                    onMouseEnter={() =>
                                      handleSeatFocus(row.alphabet, col)
                                    }
                                    onMouseLeave={() => {
                                      setSeatFocused("");
                                    }}
                                    onClick={() => {
                                      setIsSelecting(true);
                                      handleSeatSelect(
                                        row.alphabet,
                                        col,
                                        account.id,
                                      );
                                    }}
                                    icon={faCouch}
                                  />
                                ) : (
                                  <Spinner size={"sm"} />
                                )}
                              </EmptySeatBox>
                            ) : (
                              <EmptySeatBox>
                                <Box
                                  w={"22px"}
                                  h={"20px"}
                                  zIndex={3}
                                  position={"absolute"}
                                  alignContent={"center"}
                                  color={"black"}
                                >
                                  <FontAwesomeIcon
                                    size={"lg"}
                                    icon={faPerson}
                                  />
                                </Box>
                                <FontAwesomeIcon
                                  cursor={"default"}
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

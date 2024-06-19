import { Box, CloseButton, Flex, Stack } from "@chakra-ui/react";
import {
  faCouch,
  faDoorOpen,
  faLeftLong,
  faRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BorderBox from "../../../css/theme/component/box/BorderBox.jsx";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import EmptySeatBox from "../../../css/theme/component/box/EmptySeatBox.jsx";

export function TheaterSeatList() {
  const { setBookProgress } = useOutletContext();
  const [checkedSeat, setCheckedSeat] = useState({ alphabet: "", seat: 0 });
  const [mouseLocation, setMouseLocation] = useState(null);

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
  }, [checkedSeat]);

  function handleSeatClick(alphabet, number) {
    let seatNumber = number;
    if (alphabet === "A") {
      if (number > 13) {
        seatNumber = number - 2;
      } else if (number > 4) {
        seatNumber = number - 1;
      }
    } else if (alphabet === "I") {
      if (number > 6) {
        seatNumber = number - 10;
      }
    } else if (alphabet === "J") {
      if (number > 4) {
        seatNumber = number - 10;
      }
    } else {
      if (number > 15) {
        seatNumber = number - 2;
      } else if (number > 6) {
        seatNumber = number - 1;
      }
    }
  }

  return (
    <Box>
      <BorderBox alignContent={"center"} textAlign={"center"} h={"50px"}>
        <Flex justifyContent={"space-between"} m={1}>
          <Box></Box>
          <Box>인원/좌석 선택</Box>
          <CloseButton onClick={() => navigate("/book")}></CloseButton>
        </Flex>
      </BorderBox>
      <BorderBox h={"100px"}>영화 나오는 곳</BorderBox>
      <BorderBox
        h={"150px"}
        display={"flex"}
        justifyContent={"center"}
        bgColor={"blackAlpha.500"}
      >
        <Box
          mt={"-30px"}
          sx={{
            width: "500px",
            height: "150px",
            bgColor: "whiteAlpha.600",
            transform: "perspective(500px) rotateX(-65deg)",
            transformOrigin: "bottom",
          }}
        />
      </BorderBox>
      <BorderBox
        w={"900px"}
        h={"400px"}
        display={"flex"}
        justifyContent={"center"}
        align={"center"}
        borderTop={"0"}
      >
        <Box
          w={"900px"}
          h={"25px"}
          borderX={"2px solid"}
          borderBottom={"1px solid"}
          bgColor={"lightgray"}
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
          w={"900px"}
          position={"absolute"}
          bgColor={"blackAlpha.600"}
          h={"400px"}
        ></Box>
        <Box
          w={"560px"}
          h={"400px"}
          bgColor={"whitesmoke"}
          _dark={{ bgColor: "gray" }}
          zIndex={2}
        >
          <Box mt={"25px"} h={"375px"} borderX={"1px solid"}>
            <Box pt={"55px"} w={"500px"} h={"280px"}>
              <Stack align={"center"}>
                {seatList.map((seatRow, index) => (
                  <Box key={index}>
                    <Box
                      position={"absolute"}
                      w={"30px"}
                      left={"700px"}
                      color={
                        mouseLocation && mouseLocation[0] === seatRow.alphabet
                          ? "red.900"
                          : "white"
                      }
                      textAlign={"center"}
                      fontSize={
                        mouseLocation && mouseLocation[0] === seatRow.alphabet
                          ? "20px"
                          : "lg"
                      }
                      fontWeight={
                        mouseLocation && mouseLocation[0] === seatRow.alphabet
                          ? "700"
                          : ""
                      }
                    >
                      {seatRow.alphabet}
                    </Box>
                    <Flex>
                      {seatRow.seat.map((seat, index2) => (
                        <Box
                          key={index2}
                          w={"22px"}
                          my={"-2px"}
                          onMouseEnter={() =>
                            setMouseLocation(seatRow.alphabet + index2)
                          }
                          onMouseLeave={() => setMouseLocation(0)}
                          onClick={() => {
                            setCheckedSeat({
                              alphabet: seatRow.alphabet,
                              seat,
                            });
                            handleSeatClick(seatRow.alphabet, seat);
                          }}
                        >
                          {seatRow.alphabet === "A" &&
                          (seat === 5 || seat === 14) ? (
                            <Flex>
                              <EmptySeatBox></EmptySeatBox>
                            </Flex>
                          ) : seatRow.alphabet === "J" &&
                            seat > 4 &&
                            seat < 15 ? (
                            <EmptySeatBox></EmptySeatBox>
                          ) : seatRow.alphabet === "I" &&
                            seat > 6 &&
                            seat < 17 ? (
                            <EmptySeatBox></EmptySeatBox>
                          ) : seatRow.alphabet !== "A" &&
                            seatRow.alphabet !== "J" &&
                            (seat === 7 || seat === 16) ? (
                            <EmptySeatBox></EmptySeatBox>
                          ) : (
                            <Box>
                              <FontAwesomeIcon
                                cursor={"pointer"}
                                color={
                                  checkedSeat.alphabet === seatRow.alphabet &&
                                  checkedSeat.seat === seat
                                    ? "gray"
                                    : mouseLocation ===
                                        seatRow.alphabet + index2
                                      ? "gray"
                                      : "black"
                                }
                                icon={faCouch}
                              />
                            </Box>
                          )}
                        </Box>
                      ))}
                    </Flex>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>
        </Box>
      </BorderBox>
    </Box>
  );
}

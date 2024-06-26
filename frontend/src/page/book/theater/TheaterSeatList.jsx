import { Box, CloseButton, Flex, Stack } from "@chakra-ui/react";
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
    axios.get(`/book/theaterseat/${bookPlaceTime.id}`);
  }, []);

  function handleSeatClick(alphabet, number) {
    console.log(alphabet, number);
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
          <Box fontSize={"lg"} fontWeight={"600"} alignContent={"center"}>
            인원/좌석 선택
          </Box>
          <CloseButton onClick={() => navigate("/book")}></CloseButton>
        </Flex>
      </BorderBox>
      <BorderBox h={"100px"} p={1}>
        영화 나오는 곳
      </BorderBox>
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
          />
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
                                onClick={() =>
                                  handleSeatClick(row.alphabet, col)
                                }
                                icon={faCouch}
                              />
                            </EmptySeatBox>
                          </Flex>
                        ) : index === 17 && row.alphabet === "A" ? (
                          <Flex>
                            <EmptySeatBox>
                              <FontAwesomeIcon
                                onClick={() =>
                                  handleSeatClick(row.alphabet, col)
                                }
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
                                onClick={() =>
                                  handleSeatClick(row.alphabet, col)
                                }
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
                                onClick={() =>
                                  handleSeatClick(row.alphabet, col)
                                }
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
                              onClick={() => handleSeatClick(row.alphabet, col)}
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

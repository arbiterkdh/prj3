import { Box, Flex, Stack } from "@chakra-ui/react";
import { faCouch, faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BorderBox from "../../../css/theme/component/box/BorderBox.jsx";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import EmptySeatBox from "../../../css/theme/component/box/EmptySeatBox.jsx";

export function TheaterSeatList() {
  const { setBookProgress } = useOutletContext();
  const [checkedSeat, setCheckedSeat] = useState({ alphabet: "", seat: 0 });

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

  return (
    <Box>
      <BorderBox alignContent={"center"} textAlign={"center"} h={"50px"}>
        인원/좌석 선택
      </BorderBox>
      <BorderBox h={"100px"}>영화 나오는 곳</BorderBox>
      <BorderBox
        h={"150px"}
        display={"flex"}
        justifyContent={"center"}
        bgColor={"gray"}
      >
        <Box
          mt={"-30px"}
          sx={{
            width: "500px",
            height: "150px",
            backgroundColor: "darkgray",
            transform: "perspective(500px) rotateX(-65deg)",
            transformOrigin: "bottom",
          }}
        />
      </BorderBox>
      <BorderBox
        w={"900px"}
        h={"400px"}
        display={"flex"}
        justifyContent="center"
        align={"center"}
      >
        <Box
          w={"900px"}
          h={"25px"}
          borderBottom={"1px solid black"}
          bgColor={"whiteAlpha.800"}
          zIndex={1}
          position={"absolute"}
          justifyContent={"space-between"}
          display={"flex"}
          alignItems={"center"}
          p={1}
        >
          <FontAwesomeIcon icon={faDoorOpen} />
          <FontAwesomeIcon icon={faDoorOpen} />
        </Box>
        <Box
          w={"900px"}
          position={"absolute"}
          bgColor={"blackAlpha.700"}
          h={"400px"}
        ></Box>
        <Box w={"560px"} h={"400px"} bgColor={"white"} zIndex={1}>
          <Box mt={"80px"} w={"500px"} h={"400px"}>
            <Stack align={"center"}>
              {seatList.map((seatRow, index) => (
                <Flex key={index}>
                  {seatRow.seat.map((seat, index2) => (
                    <Box
                      key={index2}
                      mx={"1px"}
                      my={"-2px"}
                      onClick={() =>
                        setCheckedSeat({ alphabet: seatRow.alphabet, seat })
                      }
                    >
                      {seatRow.alphabet === "A" &&
                      (seat === 5 || seat === 14) ? (
                        <EmptySeatBox></EmptySeatBox>
                      ) : seatRow.alphabet === "J" && seat > 4 && seat < 15 ? (
                        <EmptySeatBox></EmptySeatBox>
                      ) : seatRow.alphabet === "I" && seat > 6 && seat < 17 ? (
                        <EmptySeatBox></EmptySeatBox>
                      ) : seatRow.alphabet !== "A" &&
                        seatRow.alphabet !== "J" &&
                        (seat === 7 || seat === 16) ? (
                        <EmptySeatBox></EmptySeatBox>
                      ) : (
                        <FontAwesomeIcon
                          cursor={"pointer"}
                          color={
                            checkedSeat.alphabet === seatRow.alphabet &&
                            checkedSeat.seat === seat
                              ? "gray"
                              : ""
                          }
                          icon={faCouch}
                        />
                      )}
                    </Box>
                  ))}
                </Flex>
              ))}
            </Stack>
          </Box>
        </Box>
      </BorderBox>
    </Box>
  );
}

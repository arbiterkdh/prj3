import { Box, CloseButton, Flex, Stack } from "@chakra-ui/react";
import {
  faDoorOpen,
  faLeftLong,
  faRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BorderBox from "../../../css/theme/component/box/BorderBox.jsx";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

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
        w={"884px"}
        h={"400px"}
        display={"flex"}
        justifyContent={"center"}
        align={"center"}
        borderTop={"0"}
      >
        <Box
          w={"884px"}
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
          w={"880px"}
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
          <Box mt={"24px"} h={"375px"} borderX={"1px solid"}>
            <Box pt={"55px"} w={"500px"} h={"280px"}>
              <Stack></Stack>
            </Box>
          </Box>
        </Box>
      </BorderBox>
    </Box>
  );
}

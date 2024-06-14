import { Box } from "@chakra-ui/react";
import { faCouch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BorderBox from "../../../css/theme/component/box/BorderBox.jsx";
import GapFlex from "../../../css/theme/component/flex/GapFlex.jsx";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

export function TheaterSeatList() {
  const { setBookProgress } = useOutletContext();

  useEffect(() => {
    setBookProgress(2);
  }, []);

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
        alignItems={"center"}
      >
        <Box mt={"120px"} w={"500px"} h={"400px"}>
          <GapFlex>
            <FontAwesomeIcon cursor={"pointer"} icon={faCouch} />
          </GapFlex>
        </Box>
      </BorderBox>
    </Box>
  );
}

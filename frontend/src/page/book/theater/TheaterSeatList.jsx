import { Box, Center, Stack } from "@chakra-ui/react";
import CenterBox from "../../../css/theme/component/box/CenterBox.jsx";
import { faCouch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BorderBox from "../../../css/theme/component/box/BorderBox.jsx";
import GapFlex from "../../../css/theme/component/flex/GapFlex.jsx";

export function TheaterSeatList() {
  return (
    <Center>
      <CenterBox>
        <Stack>
          <Box>
            <BorderBox alignContent={"center"} textAlign={"center"} h={"50px"}>
              인원/좌석 선택
            </BorderBox>
            <BorderBox h={"100px"}>영화 나오는 곳</BorderBox>
            <BorderBox
              w={"1000px"}
              h={"600px"}
              display={"flex"}
              justifyContent="center"
              alignItems={"center"}
            >
              <Box w={"500px"} h={"400px"}>
                <GapFlex>
                  <FontAwesomeIcon icon={faCouch} size={"md"} />
                </GapFlex>
              </Box>
            </BorderBox>
          </Box>
        </Stack>
      </CenterBox>
    </Center>
  );
}

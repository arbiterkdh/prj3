import { Button, Center, Heading } from "@chakra-ui/react";
import CenterBox from "../../../../css/theme/component/box/CenterBox.jsx";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import BorderBox from "../../../../css/theme/component/box/BorderBox.jsx";

export function TheaterLocation() {
  const location = useLocation();
  const [theaterNumber, setTheaterNumber] = useState(
    location.state.theaterNumber,
  );
  const [theaterLocation, setTheaterLocation] = useState(
    location.state.theaterLocation,
  );

  return (
    <Center>
      <CenterBox>
        <Heading textAlign={"center"}>{theaterLocation}점 CCV 정보</Heading>
        <BorderBox w={"100%"} h={"1200px"} mb={"100px"}>
          <Button>극장 정보 삽입</Button>
          <Button>극장 정보 수정</Button>
        </BorderBox>
      </CenterBox>
    </Center>
  );
}

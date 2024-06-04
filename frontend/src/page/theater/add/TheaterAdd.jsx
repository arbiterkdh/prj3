import { Box, Button, Input } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import GapFlex from "../../../css/theme/component/flex/GapFlex.jsx";

export function TheaterAdd() {
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  function handleClick() {
    axios
      .post("/api/theater/add", { city, location })
      .then((res) => {})
      .catch((err) => {})
      .finally(() => {});
  }

  return (
    <Box>
      <GapFlex>
        <Input onChange={(e) => setCity(e.target.value)} placeholder={"도시"} />
        <Input
          onChange={(e) => setLocation(e.target.value)}
          placeholder={"지역명"}
        />
        <Button w={"100%"} onClick={handleClick}>
          극장 추가
        </Button>
      </GapFlex>
    </Box>
  );
}

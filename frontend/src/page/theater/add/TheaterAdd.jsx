import { Box, Button, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import GapFlex from "../../../css/theme/component/flex/GapFlex.jsx";

export function TheaterAdd({ isModifying, setIsModifying }) {
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");

  const toast = useToast();

  function handleClick() {
    setIsModifying(true);
    axios
      .post("/api/theater/add", { city, location })
      .then((res) => {
        toast({
          status: "success",
          description: "극장이 추가되었습니다.",
          position: "bottom-right",
        });
      })
      .catch((err) => {})
      .finally(() => {
        setLocation("");
        setIsModifying(false);
      });
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

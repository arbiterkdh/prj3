import { Box, Button, Input, Select, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import GapFlex from "../../../css/theme/component/flex/GapFlex.jsx";

export function TheaterAdd({ setCityName, cityList, setIsModifying }) {
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
        setCityName(city);
      });
  }

  return (
    <Box>
      <GapFlex>
        <Select
          placeholder={"선택"}
          border={"1px solid black"}
          borderRadius={"none"}
          onChange={(e) => setCity(e.target.value)}
        >
          {cityList.map((city) => (
            <option key={city} value={city} style={{ borderRadius: "none" }}>
              {city}
            </option>
          ))}
        </Select>
        <Input
          value={location}
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

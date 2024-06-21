import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import GapFlex from "../../../css/theme/component/flex/GapFlex.jsx";

export function TheaterAdd({ setCityName, cityList, setIsModifying }) {
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  function handleCheckInput() {
    if (city.length === 0 || location.length === 0) {
      toast({
        status: "warning",
        description: "도시명 또는 지점명이 입력되지 않았습니다.",
        position: "bottom-right",
      });
    } else {
      onOpen();
    }
  }

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
      .catch(() => {})
      .finally(() => {
        setLocation("");
        setIsModifying(false);
        setCityName(city);
        onClose();
      });
  }

  return (
    <Box>
      <GapFlex>
        <Select
          placeholder={"선택"}
          border={"1px solid"}
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
          placeholder={"지점명"}
        />
        <Button w={"100%"} onClick={handleCheckInput}>
          극장 추가
        </Button>
      </GapFlex>

      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <ModalHeader>극장 추가</ModalHeader>
          <ModalBody>
            {city} 지역에 &quot;{location}&quot; 지점을 추가하시겠습니까?
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleClick}>추가</Button>
            <Button onClick={onClose}>취소</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

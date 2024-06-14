import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import TheaterListBox from "../../../css/theme/component/box/TheaterListBox.jsx";
import axios from "axios";
import CursorBox from "../../../css/theme/component/box/CursorBox.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareMinus as emptySquareMinus } from "@fortawesome/free-regular-svg-icons";
import {
  faGear,
  faSquareMinus as fullSquareMinus,
} from "@fortawesome/free-solid-svg-icons";

export function TheaterList({
  cityName,
  setCityName,
  cityList,
  setCityList,
  theaterList,
  setTheaterList,
  isModifying,
  isRemoving,
  setIsRemoving,
}) {
  const [minusButton, setMinusButton] = useState(0);
  const [modifyButton, setModifyButton] = useState(0);
  const [theaterNumber, setTheaterNumber] = useState(0);
  const [theaterLocation, setTheaterLocation] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (!isModifying && !isRemoving) {
      axios
        .get(`/api/theater/list?city=${cityName}`)
        .then((res) => {
          setTheaterList(res.data);
        })
        .catch(() => {})
        .finally(() => {
          setCityName("");
        });
    }
  }, [isModifying, isRemoving]);

  function handleClick(city) {
    axios
      .get(`/api/theater/list?city=${city}`)
      .then((res) => {
        setTheaterList(res.data);
      })
      .catch(() => {})
      .finally(() => {
        setCityName(city);
      });
  }

  function handleClickDeleteLocation(number, location) {
    setIsRemoving(true);
    axios
      .delete(`/api/theater/delete/${number}`)
      .then(() => {
        toast({
          status: "success",
          description: `목록에서 ${location} 지점이 삭제되었습니다.`,
          position: "bottom-right",
        });
        onClose();
      })
      .catch()
      .finally(() => setIsRemoving(false));
  }

  return (
    <Box w={"100%"} border={"1px solid black"}>
      <Flex width={"100%"} mb={4}>
        {cityList.map((city) => (
          <TheaterListBox key={city} onClick={() => handleClick(city)}>
            {city}
          </TheaterListBox>
        ))}
      </Flex>
      <Box my={5}>
        <Flex justifyContent={"left"} flexWrap={"wrap"}>
          {theaterList.map((theater) => (
            <Flex
              sx={{
                borderLeft: "1px solid lightgray",
              }}
              width={"25%"}
              m={0}
              pl={2}
              h={8}
              key={theater.number}
              justifyContent={"space-between"}
            >
              <CursorBox
                onClick={() =>
                  navigate("/theater/" + theater.number, {
                    state: {
                      theaterNumber: theater.number,
                      theaterLocation: theater.location,
                    },
                  })
                }
                fontSize={"sm"}
              >
                <Tooltip hasArrow label={theater.location + " 상세보기"}>
                  {theater.location}
                </Tooltip>
              </CursorBox>
              <Flex>
                <CursorBox
                  color={"gray"}
                  onClick={() =>
                    navigate("/theater/modify/" + theater.number, {
                      state: {
                        theaterNumber: theater.number,
                        theaterLocation: theater.location,
                      },
                    })
                  }
                  onMouseEnter={() => setModifyButton(theater.number)}
                  onMouseLeave={() => setModifyButton(0)}
                >
                  {modifyButton === theater.number ? (
                    <FontAwesomeIcon icon={faGear} spin />
                  ) : (
                    <FontAwesomeIcon icon={faGear} />
                  )}
                </CursorBox>
                <CursorBox
                  onClick={() => {
                    onOpen();
                    setTheaterNumber(theater.number);
                    setTheaterLocation(theater.location);
                  }}
                  onMouseEnter={() => setMinusButton(theater.number)}
                  onMouseLeave={() => setMinusButton(0)}
                >
                  {minusButton === theater.number ? (
                    <FontAwesomeIcon icon={fullSquareMinus} color={"red"} />
                  ) : (
                    <FontAwesomeIcon icon={emptySquareMinus} color={"red"} />
                  )}
                </CursorBox>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Box>

      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <ModalHeader>극장 삭제</ModalHeader>
          <ModalBody>
            목록에서 &quot;{theaterLocation}&quot; 지점을 삭제하시겠습니까?
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() =>
                handleClickDeleteLocation(theaterNumber, theaterLocation)
              }
            >
              삭제
            </Button>
            <Button onClick={onClose}>취소</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

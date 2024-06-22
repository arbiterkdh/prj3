import {
  Box,
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import BorderSelect from "../../../css/theme/component/select/BorderSelect.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

export function BookTheaterBoxTimeTableManagementComponent({
  isOpen,
  onOpen,
  onClose,
  theaterBox,
}) {
  const [selectedMovieId, setSelectedMovieId] = useState(0);
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [timeInput, setTimeInput] = useState(undefined);
  const [startDateValue, setStartDateValue] = useState(undefined);
  const [dateList, setDateList] = useState([]);

  useEffect(() => {
    let dateArray = [];

    if (startDateValue !== undefined) {
      for (let i = 0; i < 21; i++) {
        let date = new Date(
          startDateValue.getFullYear(),
          startDateValue.getMonth(),
          startDateValue.getDate() + i,
        );
        date =
          date.getFullYear() +
          "-" +
          (date.getMonth() < 11
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) +
          "-" +
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
        dateArray.push(date);
      }
      setDateList(dateArray);
    }
  }, [isOpen, startDateValue]);

  function handleSelectMovieOption(movieId) {
    if (movieId) {
      axios.get(`api/book/movie/${movieId}`).then((res) => {
        setStartDateValue(new Date(res.data.startDate));
      });
    }
  }

  return (
    <Box>
      {theaterBox.theaterBoxMovieList !== undefined ? (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent minW={"800px"} h={"600px"}>
            <ModalCloseButton />
            <ModalHeader>
              {theaterBox.theaterLocation}점 {theaterBox.boxNumber} 관 상영표
              작성
            </ModalHeader>
            <ModalBody>
              <Flex align={"center"}>
                <BorderSelect
                  w={"300px"}
                  placeholder={"영화"}
                  value={selectedMovieId}
                  onChange={(e) => {
                    setSelectedMovieId(e.target.value);
                    handleSelectMovieOption(e.target.value);
                  }}
                >
                  {theaterBox.theaterBoxMovieList.map(
                    (theaterBoxMovie, index) => (
                      <option key={index} value={theaterBoxMovie.movieId}>
                        {theaterBoxMovie.movieTitle}
                      </option>
                    ),
                  )}
                </BorderSelect>
                <BorderSelect
                  w={"130px"}
                  placeholder={"날짜"}
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                  }}
                >
                  {dateList.map((value, index) => (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  ))}
                </BorderSelect>
                <Box w={"200px"} border={"1px solid"}>
                  <HStack>
                    <PinInput defaultValue="0800">
                      <PinInputField />
                      <PinInputField />
                      <Box w={0} border={0}>
                        :
                      </Box>
                      <PinInputField />
                      <PinInputField />
                    </PinInput>
                  </HStack>
                </Box>

                <Button alignContent={"center"} textAlign={"center"}>
                  일정 추가
                </Button>
              </Flex>

              <Box mt={"20px"} fontSize={"16px"}>
                상영 테이블
              </Box>
              <Table>
                <Thead>
                  <Tr>
                    <Th w={"300px"}>영화명</Th>
                    <Th w={"20%"}>상영일</Th>
                    <Th w={"20%"}>상영시간</Th>
                    <Th>개별 관리</Th>
                  </Tr>
                </Thead>
              </Table>
              <Box h={"320px"} overflow={"scroll"} border={"1px solid"}>
                <Table>
                  {theaterBox.theaterBoxMovieList.map(
                    (theaterBoxMovie, index) => (
                      <Tbody key={index}>
                        {theaterBoxMovie.bookPlaceTimeList.map(
                          (bookPlaceTime, index) => (
                            <Tr
                              key={index}
                              display={
                                selectedDate === undefined ||
                                selectedDate === "" ||
                                bookPlaceTime.startTime.slice(0, 10) ===
                                  selectedDate
                                  ? "block"
                                  : "none"
                              }
                            >
                              <Td w={"280px"}>{theaterBoxMovie.movieTitle}</Td>
                              <Td w={"22%"}>
                                {bookPlaceTime.startTime.slice(0, 10)}
                              </Td>
                              <Td w={"24%"}>
                                {bookPlaceTime.startTime.slice(11, 16) +
                                  "~" +
                                  bookPlaceTime.endTime.slice(11, 16)}
                              </Td>
                              <Td>
                                <Button size={"xs"}>수정</Button>
                              </Td>
                            </Tr>
                          ),
                        )}
                      </Tbody>
                    ),
                  )}
                </Table>
              </Box>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      ) : (
        ""
      )}
    </Box>
  );
}

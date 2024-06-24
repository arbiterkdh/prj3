import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import BorderSelect from "../../../css/theme/component/select/BorderSelect.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

export function BookTheaterBoxTimeTableManagementComponent({
  isOpen,
  onOpen,
  onClose,
  theaterBox,
  setTheaterBox,
  isAdding,
  setIsAdding,
}) {
  const [selectedMovieId, setSelectedMovieId] = useState(0);
  const [selectedTheaterBoxMovieId, setSelectedTheaterBoxMovieId] = useState(0);
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [timeInput, setTimeInput] = useState("08:00");
  const [startDateValue, setStartDateValue] = useState(undefined);
  const [dateList, setDateList] = useState([]);

  const toast = useToast();

  useEffect(() => {
    if (theaterBox.id !== undefined && isAdding) {
      axios.get(`/api/theaterbox/${theaterBox.id}`).then((res) => {
        setTheaterBox(res.data);
        console.log(res.data);
      });
    }

    let dateArray = [];
    if (startDateValue) {
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
    if (startDateValue === "") {
      setDateList([]);
    }
  }, [isOpen, startDateValue, selectedDate, selectedMovieId, isAdding]);

  function handleClickAddBookPlaceTime() {
    setIsAdding(true);

    axios
      .post("/api/book/bookplacetime/add", {
        theaterBoxMovieId: selectedTheaterBoxMovieId,
        movieId: selectedMovieId,
        startTime: selectedDate + "T" + timeInput,
      })
      .then((res) => {
        toast({
          status: "success",
          description: "상영 일정이 추가되었습니다.",
          position: "bottom-right",
        });
      })
      .catch((err) => {
        if (err.response.status === 409) {
          toast({
            status: "error",
            description: "기존 상영 일정과 겹칩니다.",
            position: "bottom-right",
          });
        }
      })
      .finally(() => setIsAdding(false));
  }

  function handleSelectMovieOption(movieId) {
    if (!movieId) {
      setStartDateValue("");
      return;
    }
    if (movieId) {
      axios.get(`api/book/movie/${movieId}`).then((res) => {
        setStartDateValue(new Date(res.data.startDate));
      });
    }
  }

  function handleWheel(e) {
    let time = timeInput.split(":");
    let hour = Number(time[0]);
    let minutes = Number(time[1]);

    let newTime;
    if (e.deltaY > 0) {
      // 휠 내릴때
      newTime = handleTimeChange(hour, minutes, -10);
    } else {
      // 휠 올릴때
      newTime = handleTimeChange(hour, minutes, 10);
    }

    setTimeInput(newTime);
  }

  function handleTimeChange(hour, minutes, deltaMinutes) {
    minutes += deltaMinutes;

    if (minutes < 0) {
      minutes = 60 + minutes;
      hour--;
    } else if (minutes >= 60) {
      minutes = minutes - 60;
      hour++;
    }

    if (hour < 8) {
      hour = 23;
    } else if (hour > 23) {
      hour = 8;
    }

    return `${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  }

  return (
    <Box>
      {theaterBox.theaterBoxMovieList !== undefined ? (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            onClose();
            setSelectedMovieId(0);
            setSelectedTheaterBoxMovieId(0);
            setSelectedDate("");
            setTimeInput("08:00");
          }}
          isCentered
        >
          <ModalOverlay />
          <ModalContent minW={"800px"} h={"600px"}>
            <ModalCloseButton />
            <ModalHeader mt={"10px"}>
              {theaterBox.theaterLocation}점 {theaterBox.boxNumber} 관 상영표
              작성
            </ModalHeader>
            <ModalBody>
              <Flex align={"center"}>
                <BorderSelect
                  w={"300px"}
                  placeholder={"영화"}
                  onChange={(e) => {
                    let values = e.target.value.split("\\");
                    setSelectedMovieId(Number(values[0]));
                    setSelectedTheaterBoxMovieId(Number(values[1]));
                    setSelectedDate("");
                    handleSelectMovieOption(values[0]);
                  }}
                >
                  {theaterBox.theaterBoxMovieList.map(
                    (theaterBoxMovie, index) => (
                      <option
                        key={index}
                        value={
                          theaterBoxMovie.movieId + "\\" + theaterBoxMovie.id
                        }
                      >
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
                <Input
                  max={"23:50"}
                  min={"08:00"}
                  w={"150px"}
                  type={"time"}
                  value={timeInput}
                  step={600}
                  onClick={(e) => e.preventDefault()}
                  onWheel={handleWheel}
                  onChange={(e) => {
                    let prevTime = timeInput.split(":");
                    let prevMinutes = Number(prevTime[1]);

                    let time = e.target.value.split(":");
                    let hour = Number(time[0]);
                    let minutes = Number(time[1]);
                    if (minutes % 10 !== 0) {
                      if (minutes < 6) {
                        minutes *= 10;
                      } else {
                        minutes = 0;
                      }
                    }

                    if (minutes === 0 && prevMinutes === 50) {
                      hour++;
                    } else if (minutes === 50 && prevMinutes === 0) {
                      hour--;
                    }

                    if (hour > 23 || hour === 0) {
                      hour = 8;
                    } else if (hour < 8) {
                      hour = 23;
                    }

                    setTimeInput(
                      `${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`,
                    );
                  }}
                />

                <Button
                  alignContent={"center"}
                  textAlign={"center"}
                  isDisabled={!selectedDate || !selectedMovieId}
                  onClick={handleClickAddBookPlaceTime}
                >
                  일정 추가
                </Button>
              </Flex>

              <Box fontWeight={"600"} mx={"5px"} mt={"45px"} fontSize={"16px"}>
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
                {!isAdding ? (
                  <Table>
                    {theaterBox.theaterBoxMovieList.map(
                      (theaterBoxMovie, index) => (
                        <Tbody key={index}>
                          {theaterBoxMovie.bookPlaceTimeList.map(
                            (bookPlaceTime, index) => (
                              <Tr
                                key={index}
                                display={
                                  selectedMovieId === 0
                                    ? "block"
                                    : selectedMovieId ===
                                          theaterBoxMovie.movieId &&
                                        (selectedDate === undefined ||
                                          selectedDate === "")
                                      ? "block"
                                      : selectedMovieId ===
                                            theaterBoxMovie.movieId &&
                                          bookPlaceTime.startTime.slice(
                                            0,
                                            10,
                                          ) === selectedDate
                                        ? "block"
                                        : "none"
                                }
                              >
                                <Td w={"280px"}>
                                  {theaterBoxMovie.movieTitle}
                                </Td>
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
                ) : (
                  <Spinner />
                )}
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

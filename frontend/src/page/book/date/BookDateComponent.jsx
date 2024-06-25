import { Box, Flex, Spinner, Stack } from "@chakra-ui/react";
import BookBox from "../../../css/theme/component/box/BookBox.jsx";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import CursorBox from "../../../css/theme/component/box/CursorBox.jsx";

export function BookDateComponent({ selectedDay, setSelectedDay }) {
  const [dayOfWeek, setDayOfWeek] = useState(0);
  const [bookPeriodList, setBookPeriodList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const dateRef = useRef(null);
  const [positionX, setPositionX] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/book/date`)
      .then((res) => {
        setDayOfWeek(res.data.dayOfWeek);
        setBookPeriodList(res.data.bookPeriodList);
      })
      .catch()
      .finally(() => setIsLoading(false));
  }, []);

  function handleClickLeft() {
    setPositionX((prev) => Math.min(prev + 125, 0));
  }

  function handleClickRight() {
    const flexWidth = dateRef.current.scrollWidth;
    const containerWidth = dateRef.current.parentElement.offsetWidth;
    setPositionX((prev) => Math.max(prev - 125, containerWidth - flexWidth));
  }

  let bookPeriodListPlusDayOfWeek = [];

  bookPeriodList.map((book, index) => {
    let dayOfOneWeek = "";

    switch (((dayOfWeek + index) % 7) + 1) {
      case 1:
        dayOfOneWeek = "토";
        break;
      case 2:
        dayOfOneWeek = "일";
        break;
      case 3:
        dayOfOneWeek = "월";
        break;
      case 4:
        dayOfOneWeek = "화";
        break;
      case 5:
        dayOfOneWeek = "수";
        break;
      case 6:
        dayOfOneWeek = "목";
        break;
      case 7:
        dayOfOneWeek = "금";
        break;
    }
    bookPeriodListPlusDayOfWeek.push(book + "-" + dayOfOneWeek);
  });

  return (
    <Box>
      {isLoading ? (
        <Spinner />
      ) : (
        <Box>
          <BookBox
            fontWeight={"600"}
            border={"none"}
            borderLeft={"1px solid"}
            borderBottom={"1px solid"}
          >
            {"기준일: " +
              selectedDay.split("-")[0] +
              "년 " +
              selectedDay.split("-")[1] +
              "월 " +
              selectedDay.split("-")[2] +
              "일 (" +
              selectedDay.split("-")[3] +
              ")"}
          </BookBox>

          <Flex align={"center"} borderLeft={"1px solid"} px={1}>
            <ArrowLeftIcon onClick={handleClickLeft} cursor={"pointer"} />
            <Box
              w={"320px"}
              h={"100px"}
              alignContent={"center"}
              overflow={"hidden"}
            >
              <Flex
                ref={dateRef}
                sx={{
                  transform: `translateX(${positionX}px)`,
                  transition: "transform 0.5s ease",
                }}
              >
                {bookPeriodListPlusDayOfWeek.map((day, index) => (
                  <CursorBox
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    rounded={"full"}
                    color={selectedDay === day ? "whiteAlpha.900" : ""}
                    bgColor={selectedDay === day ? "red.500" : ""}
                    _dark={selectedDay === day ? { bgColor: "red.700" } : {}}
                    align={"center"}
                    _hover={
                      selectedDay === day
                        ? {}
                        : {
                            bgColor: "red.500",
                            color: "whiteAlpha.900",
                          }
                    }
                  >
                    <Stack w={"55px"} h={"55px"}>
                      <Box fontSize={"xx-small"} mb={"-3px"}>
                        {day.split("-")[1]}
                      </Box>
                      <Box mt={-4} fontSize={"x-large"} fontWeight={"500"}>
                        {day.split("-")[2]}
                      </Box>
                      <Box mt={-4} align={"center"}>
                        {day.split("-")[3]}
                      </Box>
                    </Stack>
                  </CursorBox>
                ))}
              </Flex>
            </Box>
            <ArrowRightIcon onClick={handleClickRight} cursor={"pointer"} />
          </Flex>
        </Box>
      )}
    </Box>
  );
}

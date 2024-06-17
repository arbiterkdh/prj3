import { Box, Flex, Spinner, Stack } from "@chakra-ui/react";
import BookBox from "../../../css/theme/component/box/BookBox.jsx";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import CursorBox from "../../../css/theme/component/box/CursorBox.jsx";

export function BookDateComponent({ selectedDay, setSelectedDay }) {
  const [today, setToday] = useState("");
  const [dayOfOneWeekAgo, setDayOfOneWeekAgo] = useState(0);
  const [dayOfOneWeekAgoInKorean, setDayOfOneWeekAgoInKorean] = useState("");
  const [bookPeriodList, setBookPeriodList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const dateRef = useRef(null);
  const [positionX, setPositionX] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/book/date`)
      .then((res) => {
        setToday(res.data.today.split("-"));
        setDayOfOneWeekAgo(res.data.dayOfOneWeekAgo);
        setDayOfOneWeekAgoInKorean(res.data.dayOfOneWeekAgoInKorean);
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
    let dayOfWeek = "";

    switch (((dayOfOneWeekAgo + index) % 7) + 1) {
      case 1:
        dayOfWeek = "토";
        break;
      case 2:
        dayOfWeek = "일";
        break;
      case 3:
        dayOfWeek = "월";
        break;
      case 4:
        dayOfWeek = "화";
        break;
      case 5:
        dayOfWeek = "수";
        break;
      case 6:
        dayOfWeek = "목";
        break;
      case 7:
        dayOfWeek = "금";
        break;
    }
    bookPeriodListPlusDayOfWeek.push(book + "-" + dayOfWeek);
  });

  return (
    <Box>
      {isLoading ? (
        <Spinner />
      ) : (
        <Box>
          <BookBox>
            {today[0] +
              "년 " +
              today[1] +
              "월 " +
              today[2] +
              "일 (" +
              dayOfOneWeekAgoInKorean +
              ")"}
          </BookBox>

          <Flex
            align={"center"}
            borderLeft={"1px solid black"}
            borderRight={"1px solid black"}
          >
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
                {bookPeriodListPlusDayOfWeek.map((day) => (
                  <CursorBox
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    rounded={"full"}
                    color={selectedDay === day ? "white" : ""}
                    bgColor={selectedDay === day ? "red.500" : ""}
                    align={"center"}
                  >
                    <Stack w={"55px"} justifyContent={"space-evenly"}>
                      <Box fontSize={"xx-small"}>{day.split("-")[1]}</Box>
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

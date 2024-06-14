import { Box, Flex, Spinner } from "@chakra-ui/react";
import BookBox from "../../../css/theme/component/box/BookBox.jsx";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import MarginBox from "../../../css/theme/component/box/MarginBox.jsx";
import CursorBox from "../../../css/theme/component/box/CursorBox.jsx";

export function BookDateComponent() {
  const [today, setToday] = useState("");
  const [dayOfOneWeekAgo, setDayOfOneWeekAgo] = useState(0);
  const [dayOfOneWeekAgoInKorean, setDayOfOneWeekAgoInKorean] = useState("");
  const [bookPeriodList, setBookPeriodList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(0);

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
        dayOfWeek = "일";
        break;
      case 2:
        dayOfWeek = "월";
        break;
      case 3:
        dayOfWeek = "화";
        break;
      case 4:
        dayOfWeek = "수";
        break;
      case 5:
        dayOfWeek = "목";
        break;
      case 6:
        dayOfWeek = "금";
        break;
      case 7:
        dayOfWeek = "토";
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
                    onClick={() => setIsSelected(day)}
                    rounded={"full"}
                    color={isSelected === day ? "white" : ""}
                    bgColor={isSelected === day ? "red.500" : ""}
                  >
                    <Flex w={"55px"} h={"33px"} justifyContent={"space-evenly"}>
                      <MarginBox fontSize={"xx-small"}>
                        {day.split("-")[1]}
                      </MarginBox>
                      <Box fontSize={"x-large"} fontWeight={"500"}>
                        {day.split("-")[2]}
                      </Box>
                    </Flex>
                    <Box align={"center"}>{day.split("-")[3]}</Box>
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

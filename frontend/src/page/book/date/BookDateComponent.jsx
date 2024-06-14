import { Box, Flex } from "@chakra-ui/react";
import BookBox from "../../../css/theme/component/box/BookBox.jsx";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import MarginBox from "../../../css/theme/component/box/MarginBox.jsx";

export function BookDateComponent() {
  const [today, setToday] = useState("");
  const [dayOfOneWeekAgo, setDayOfOneWeekAgo] = useState(0);
  const [bookPeriodList, setBookPeriodList] = useState([]);

  const dateRef = useRef(null);
  const [positionX, setPositionX] = useState(0);

  useEffect(() => {
    axios.get(`/api/book/date`).then((res) => {
      setToday(res.data.today);
      setDayOfOneWeekAgo(res.data.dayOfOneWeekAgo);
      setBookPeriodList(res.data.bookPeriodList);
    });
  }, []);

  function handleClickLeft() {
    setPositionX((prev) => Math.min(prev + 100, 0));
  }

  function handleClickRight() {
    const flexWidth = dateRef.current.scrollWidth;
    const containerWidth = dateRef.current.parentElement.offsetWidth;
    setPositionX((prev) => Math.max(prev - 100, containerWidth - flexWidth));
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
      <BookBox>
        {today[0] +
          "년 " +
          today[1] +
          "월 " +
          today[2] +
          "일 (" +
          dayOfOneWeekAgo +
          ")"}
      </BookBox>
      <Box w={"300px"}>
        <ArrowLeftIcon onClick={handleClickLeft} />
        <Flex
          ref={dateRef}
          sx={{
            transform: `translateX(${positionX}px)`,
            transition: "transform 0.5s ease",
          }}
        >
          {bookPeriodListPlusDayOfWeek.map((day) => (
            <Box key={day}>
              <Flex w={"100px"}>
                <MarginBox fontSize={"xx-small"}>{day.split("-")[1]}</MarginBox>
                <Box fontSize={"x-large"} fontWeight={"500"}>
                  {day.split("-")[2]}
                </Box>
              </Flex>
              <Box>{day.split("-")[3]}</Box>
            </Box>
          ))}
        </Flex>
        <ArrowRightIcon onClick={handleClickRight} />
      </Box>
    </Box>
  );
}

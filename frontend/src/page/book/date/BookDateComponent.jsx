import { Box, Flex } from "@chakra-ui/react";
import BookBox from "../../../css/theme/component/box/BookBox.jsx";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

export function BookDateComponent() {
  const [today, setToday] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [bookPeriodList, setBookPeriodList] = useState([]);
  const [date, setDate] = useState("");

  const dateRef = useRef(null);
  const [positionX, setPositionX] = useState(0);

  useEffect(() => {
    axios.get(`/api/book/date`).then((res) => {
      setToday(res.data.today);
      setDayOfWeek(res.data.dayOfWeek);
      setBookPeriodList(res.data.bookPeriodList);
    });
  }, [date]);

  function handleClickLeft() {}

  function handleClickRight() {}

  return (
    <Box>
      <BookBox>
        {today[0] +
          "년 " +
          today[1] +
          "월 " +
          today[2] +
          "일 (" +
          dayOfWeek +
          ")"}
      </BookBox>
      <Box w={"300px"}>
        <ArrowLeftIcon onClick={handleClickLeft} />
        <Flex ref={dateRef} sx={{ transform: `translateX(${positionX}px)` }}>
          {bookPeriodList.map((day) => (
            <BookBox key={day}>{day}</BookBox>
          ))}
        </Flex>
        <ArrowRightIcon onClick={handleClickRight} />
      </Box>
    </Box>
  );
}

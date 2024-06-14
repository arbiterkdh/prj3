import { Box } from "@chakra-ui/react";
import BookBox from "../../../css/theme/component/box/BookBox.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

export function BookDateComponent() {
  const [today, setToday] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState(0);
  const [oneWeekAgo, setOneWeekAgo] = useState("");
  const [oneMonthLater, setOneMonthLater] = useState("");
  const [endOfMonth, setEndOfMonth] = useState("");

  useEffect(() => {
    axios.get("/api/book/date").then((res) => {
      setToday(res.data.today.split("-"));
      setDayOfWeek(res.data.dayOfWeek);
      setOneWeekAgo(res.data.oneWeekAgo);
      setOneMonthLater(res.data.oneMonthLater);
      setEndOfMonth(res.data.endOfMonth.split("-"));
    });
  }, []);

  const dateList = [];

  for (let i = oneWeekAgo[2]; i < endOfMonth[2]; i++) {
    // dateList.push(oneWeekAgo[])
  }

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
      <BookBox>
        {dateList.map((date) => (
          <Box key={date}>{date}</Box>
        ))}
      </BookBox>
    </Box>
  );
}

import { Box } from "@chakra-ui/react";
import BookBox from "../../../css/theme/component/box/BookBox.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

export function BookDateComponent() {
  const [today, setToday] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState(0);
  const [date, setDate] = useState(0);

  useEffect(() => {
    axios.get(`/api/book/date/${date}`).then((res) => {
      setToday(res.data.today.split("-"));
      setDayOfWeek(res.data.dayOfWeek);
    });
  }, [date]);

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
      <BookBox onClick={() => setDate(1)}>날짜 페이징 할 곳</BookBox>
    </Box>
  );
}

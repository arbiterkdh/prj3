import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function BookTheaterLocationMovieList({
  checkedTheaterNumber,
  onScreenList,
  willScreenList,
  checkedMovieId,
  selectedDay,
  setSelectedDay,
  theaterBoxList,
}) {
  const [timeTableRemain, setTimeTableRemain] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (checkedTheaterNumber && selectedDay) {
      axios
        .get(
          `/api/theaterbox/onscreenlist?date=${selectedDay.slice(0, -2)}&theaterNumber=${checkedTheaterNumber}`,
        )
        .then((res) => {});
      // 체크한 날짜에 맞는 타임테이블 가져오기.
    }
  }, [checkedTheaterNumber, selectedDay]);

  // 영화 시작시간 아침 9시
  // 영화 마감시간 밤 12시

  function handleBookDataClick(state) {
    // 예매 데이터 클릭 처리
  }

  return <Box h={"inherit"} overflowY={"scroll"}></Box>;
}

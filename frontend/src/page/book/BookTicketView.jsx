import { Box, Flex, Heading, Image, Spinner, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ColorButton from "../../css/theme/component/button/ColorButton.jsx";
import { useNavigate } from "react-router-dom";

export function BookTicketView({ bookTicketData, isMyPage }) {
  const [ticketDate, setTicketDate] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {}, []);

  useEffect(() => {
    if (bookTicketData.bookPlaceTime) {
      let date = new Date(bookTicketData.bookPlaceTime.startTime);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let startHour =
        date.getHours() < 12
          ? "오전 " + date.getHours()
          : "오후 " + date.getHours();
      let startMinute =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let endHourNumber = Number(
        bookTicketData.bookPlaceTime.endTime.slice(11, 13),
      );
      let endHour =
        endHourNumber < 12 ? endHourNumber : "오후 " + endHourNumber;
      let endMinute = bookTicketData.bookPlaceTime.endTime.slice(14, 16);
      setTicketDate([
        year,
        month,
        day,
        startHour + ":" + startMinute,
        endHour + ":" + endMinute,
      ]);
    }
  }, [bookTicketData]);

  return (
    <Box>
      {bookTicketData.movie &&
      bookTicketData.theater &&
      bookTicketData.theaterBox &&
      bookTicketData.bookTicket &&
      bookTicketData.bookPlaceTime &&
      bookTicketData.payment &&
      ticketDate.length > 0 ? (
        <Box
          w={"877px"}
          h={"450px"}
          bgColor={"darkslategray"}
          align={"center"}
          alignContent={"center"}
          position={"relative"}
          _dark={{ opacity: "0.9" }}
        >
          <Box position={"absolute"} w={"100%"} h={"100%"} p={8} px={36}>
            <Heading
              position={"absolute"}
              left={"480px"}
              top={"100px"}
              w={"240px"}
              h={"70px"}
              p={2}
              align={"left"}
              color={"black"}
            >
              {bookTicketData.movie.title}
            </Heading>
            <Stack
              position={"absolute"}
              left={"280px"}
              top={"35px"}
              w={"185px"}
              p={3}
              textAlign={"left"}
            >
              <Box h={"70px"} mt={4} color={"black"}>
                {bookTicketData.theater.city +
                  " " +
                  bookTicketData.theater.location +
                  "점 " +
                  bookTicketData.theaterBox.boxNumber +
                  "관"}
              </Box>
              <Box mt={20}>
                <Flex
                  gap={1}
                  fontSize={"14px"}
                  mb={
                    bookTicketData.bookTicket.bookTicketRowCols.split(",")
                      .length < 10
                      ? 4
                      : 0
                  }
                >
                  <Stack gap={1} color={"black"}>
                    <Box w={"40px"}>{"좌석: "}</Box>
                    <Box w={"40px"} ml={"-2px"} color={"black"}>
                      {" (" +
                        bookTicketData.bookTicket.bookTicketRowCols.split(",")
                          .length +
                        "명)"}
                    </Box>
                  </Stack>
                  <Flex w={"120px"} wrap={"wrap"} color={"black"}>
                    {bookTicketData.bookTicket.bookTicketRowCols
                      .split(" ")
                      .map((seat, index) => {
                        return (
                          <Box key={index} mr={1}>
                            {seat}
                          </Box>
                        );
                      })}
                  </Flex>
                </Flex>
                <Box color={"black"}>
                  {ticketDate[0] +
                    "년 " +
                    ticketDate[1] +
                    "월 " +
                    ticketDate[2] +
                    "일"}
                </Box>
                <Box color={"black"}>{ticketDate[3] + "~" + ticketDate[4]}</Box>
              </Box>
            </Stack>
          </Box>
          <Box
            position={"absolute"}
            top={"350px"}
            left={"570px"}
            fontSize={"16px"}
            color={"black"}
            bgColor={"white"}
          >
            {bookTicketData.payment.orderNumber}
          </Box>
          <Image
            w={"780px"}
            src={
              "https://myawsbucket-arbiterkdh.s3.ap-northeast-2.amazonaws.com/prj3/main/ccv_ticket-removebg-preview.png"
            }
          />
        </Box>
      ) : (
        <Spinner />
      )}
      {!isMyPage && bookTicketData.member && (
        <Box h={"200px"} align={"center"} alignContent={"center"}>
          <Image
            position={"absolute"}
            w={"877px"}
            h={"200px"}
            minW={"877px"}
            minH={"200px"}
            top={"635px"}
            src={
              "https://myawsbucket-arbiterkdh.s3.ap-northeast-2.amazonaws.com/prj3/main/pngwing.com.png"
            }
          />
          <Heading>
            예매해주셔서 감사합니다, {bookTicketData.member.nickName} 님!
          </Heading>
          <Box>
            <ColorButton onClick={() => navigate("/mypage")}>
              예매권 확인
            </ColorButton>
            <ColorButton onClick={() => navigate("/movie")}>
              영화 구경하기
            </ColorButton>
            <ColorButton onClick={() => navigate("/book")}>
              다른 영화 예매
            </ColorButton>
            <ColorButton onClick={() => navigate("/store")}>
              음식 구매
            </ColorButton>
            <ColorButton onClick={() => navigate("/promotion")}>
              이벤트 참여
            </ColorButton>
          </Box>
        </Box>
      )}
    </Box>
  );
}

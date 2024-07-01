import {
  Box,
  CloseButton,
  Flex,
  Image,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { LoginContext } from "../../../component/LoginProvider.jsx";
import axios from "axios";

export function BookMoviePayment() {
  const { setBookProgress } = useOutletContext();
  const account = useContext(LoginContext);
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  const [bookDatas, setBookDatas] = useState(location.state);

  useEffect(() => {
    if (!account.isLoggedIn()) {
      navigate("/");
      toast({
        status: "warning",
        description: "잘못된 요청입니다.",
        position: "bottom-right",
      });
    }
    console.log(bookDatas);
    setBookProgress(3);
  }, []);

  function handleClickRemoveBookSeatData(
    bookSeatMemberNumber,
    bookPlaceTimeId,
  ) {
    axios.delete(
      `/api/book/theaterseat/delete?bookseatmembernumber=${bookSeatMemberNumber}&bookplacetimeid=${bookPlaceTimeId}`,
    );
  }

  return (
    <Box w={"878px"} h={"700px"} borderLeft={"2px"}>
      <Stack gap={0}>
        <Box
          h={"50px"}
          borderY={"1px"}
          align={"center"}
          alignContent={"center"}
          fontSize={"20px"}
          fontWeight={"600"}
        >
          <Flex align={"center"} justifyContent={"space-between"} p={2}>
            <Box></Box>
            <Box>예매정보 확인 및 결제</Box>
            <CloseButton
              onClick={() => {
                handleClickRemoveBookSeatData(
                  account.id,
                  bookDatas.bookSeatBookPlaceTimeId,
                );
                navigate("/book");
              }}
            />
          </Flex>
        </Box>

        <Box w={"100%"} h={"200px"} borderBottom={"1px"} p={2}>
          <Flex justifyContent={"space-between"}>
            <Flex w={"50%"} gap={2}>
              <Image maxH={"180px"} src={bookDatas.movie.movieImageFile} />
              <Stack w={"100%"} p={1} rowGap={1}>
                <Box fontSize={"lg"} fontWeight={"600"}>
                  {bookDatas.movie.title}
                </Box>
                <Box>
                  {bookDatas.city} {bookDatas.location} {bookDatas.boxNumber}관
                </Box>
                <Flex gap={2}>
                  <Box>상영일시: {bookDatas.startTime.slice(0, 10)} / </Box>
                  <Box>
                    {bookDatas.startTime.slice(11, 16) +
                      "~" +
                      bookDatas.endTime.slice(11, 16)}
                  </Box>
                </Flex>

                <Box>인원: {bookDatas.numberOfPeople}명</Box>
                <Flex gap={1} h={"50px"} w={"100%"}>
                  <Box w={"38px"}>좌석:</Box>
                  <Flex w={"250px"} flexWrap={"wrap"} gap={1}>
                    {bookDatas.seatSelected.map((seat, index) => {
                      if (index !== bookDatas.seatSelected.length - 1) {
                        return <Box key={index}>{seat + ","}</Box>;
                      } else {
                        return <Box key={index}>{seat}</Box>;
                      }
                    })}
                  </Flex>
                </Flex>
              </Stack>
            </Flex>

            <Stack w={"50%"}>
              <Box>
                결제금액:{" "}
                {bookDatas.totalAmount.toString().slice(-6, -3) +
                  "," +
                  bookDatas.totalAmount.toString().slice(-3)}
                원
              </Box>
            </Stack>
          </Flex>
        </Box>
      </Stack>
    </Box>
  );
}

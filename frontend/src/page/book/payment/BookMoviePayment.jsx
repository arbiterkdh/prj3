import {
  Box,
  Button,
  CloseButton,
  Flex,
  Image,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { LoginContext } from "../../../component/LoginProvider.jsx";
import axios from "axios";
import ColorButton from "../../../css/theme/component/button/ColorButton.jsx";
import { RiKakaoTalkFill } from "react-icons/ri";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPlayer from "react-player";

export function BookMoviePayment() {
  const { setBookProgress } = useOutletContext();
  const account = useContext(LoginContext);
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  const [bookData, setBookData] = useState(location.state);
  const [paymentId, setPaymentId] = useState(0);

  const KMDbKey = import.meta.env.VITE_KMDb_APP_KEY;
  const KMDbMovieInfoURL = `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y`;
  const [vodUrl, setVodUrl] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/v1/iamport.js";
    script.onload = () => {
      if (window.IMP) {
        window.IMP.init("imp35314433");
      }
    };
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!account.isLoggedIn() || !bookData) {
      navigate("/");
      toast({
        status: "warning",
        description: "잘못된 요청입니다.",
        position: "bottom-right",
      });
      axios
        .put("/api/book/theaterseat/state/paying", {
          bookSeatBookPlaceTimeId: bookData.bookSeatBookPlaceTimeId,
          rowColList: bookData.seatSelected,
          bookSeatMemberNumber: account.id,
          isPaying: false,
        })
        .then((res) => {});
    }
    if (bookData && account.isLoggedIn()) {
      axios
        .put("/api/book/theaterseat/state/paying", {
          bookSeatBookPlaceTimeId: bookData.bookSeatBookPlaceTimeId,
          rowColList: bookData.seatSelected,
          bookSeatMemberNumber: account.id,
          isPaying: true,
        })
        .then((res) => {});
      axios
        .get(
          `${KMDbMovieInfoURL}&title=${bookData.movie.title}&ServiceKey=${KMDbKey}`,
        )
        .then((res) => {
          let vodFileName =
            res.data.Data[0].Result[0].vods.vod[0].vodUrl.split("=")[1];
          setVodUrl(`https://www.kmdb.or.kr/trailer/play/${vodFileName}`);
        });
    }
    console.log(bookData);
    setBookProgress(3);
  }, [bookData]);

  function handleClickRemoveBookSeatData(
    bookSeatMemberNumber,
    bookPlaceTimeId,
  ) {
    axios.delete(
      `/api/book/theaterseat/delete?bookseatmembernumber=${bookSeatMemberNumber}&bookplacetimeid=${bookPlaceTimeId}`,
    );
  }

  function makeMerchantUid() {
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    return `OrderNo_${hours}${minutes}${seconds}`;
  }

  function onClickInicsis() {
    const { IMP } = window;
    if (!IMP) return;

    IMP.request_pay(
      {
        pg: "html5_inicis.INIpayTest",
        pay_method: "card",
        merchant_uid: makeMerchantUid(),
        name: bookData.movie.title + " 예매 티켓",
        amount: bookData.totalAmount,
        buyer_email: account.email,
        buyer_name: account.nickName,
        buyer_tel: "010-1234-5678",
        buyer_addr: "서울특별시 강남구 삼성동",
        buyer_postcode: "123-456",
        m_redirect_url: "{모바일에서 결제 완료 후 리디렉션 될 URL}",
        escrow: true, //에스크로 결제인 경우 설정
        vbank_due: "YYYYMMDD",
        bypass: {
          acceptmethod: "noeasypay",

          P_RESERVED: "noeasypay=Y",
        },
        period: {
          from: "20200101",
          to: "20201231",
        },
      },
      function (rsp) {
        if (rsp.success) {
          console.log(rsp + "결제 성공");
          axios
            .post("/api/book/payment/add", {
              success: rsp.success,
              orderNumber: rsp.merchant_uid,
              status: rsp.status,
              amount: rsp.paid_amount,
              buyerName: rsp.buyer_name,
              buyerEmail: rsp.buyer_email,
              memberNumber: account.id,
              bookData,
            })
            .then((res) => {
              const paymentId = res.data;
              setPaymentId(paymentId);
              navigate("/book/payment/payment-success", {
                state: { paymentId },
              });
            })
            .catch(() => {})
            .finally(() => {});
        } else {
          console.log(rsp + "결제 실패");
        }
      },
    );
  }

  function onClickKakaopay() {
    const { IMP } = window;
    if (!IMP) return;

    IMP.request_pay(
      {
        pg: "kakaopay",
        pay_method: "card",
        merchant_uid: makeMerchantUid(),
        name: bookData.movie.title + " 예매 티켓",
        amount: bookData.totalAmount,
        buyer_email: account.email,
        buyer_name: account.nickName,
        buyer_tel: "010-1234-5678",
        buyer_addr: "서울특별시 강남구 삼성동",
        buyer_postcode: "123-456",
        m_redirect_url: "{모바일에서 결제 완료 후 리디렉션 될 URL}",
        escrow: true,
        vbank_due: "YYYYMMDD",
        bypass: {
          acceptmethod: "noeasypay",

          P_RESERVED: "noeasypay=Y",
        },
        period: {
          from: "20200101",
          to: "20201231",
        },
      },
      function (rsp) {
        if (rsp.success) {
          console.log(rsp + "결제 성공");

          axios
            .post("/api/book/payment/add", {
              success: rsp.success,
              orderNumber: rsp.merchant_uid,
              status: rsp.status,
              amount: rsp.paid_amount,
              buyerName: rsp.buyer_name,
              buyerEmail: rsp.buyer_email,
              memberNumber: account.id,
              bookData,
            })
            .then((res) => {
              const paymentId = res.data;
              setPaymentId(paymentId);
              navigate("/book/payment/payment-success", {
                state: { paymentId },
              });
            })
            .catch(() => {})
            .finally(() => {});
        } else {
          console.log(rsp + "결제 실패");
        }
      },
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
                  bookData.bookSeatBookPlaceTimeId,
                );
                navigate("/book");
              }}
            />
          </Flex>
        </Box>

        <Box w={"100%"} h={"652px"} borderBottom={"1px"} p={3}>
          <Stack>
            <Flex w={"50%"} gap={5}>
              <Image
                maxH={"495px"}
                src={bookData.movie.movieImageFile}
                boxShadow={"0 0 4px rgba(0, 0, 0, 1)"}
              />
              <Stack w={"100%"} p={1} rowGap={1}>
                <Box fontSize={"lg"} fontWeight={"600"}>
                  {bookData.movie.title}
                </Box>
                <Box>
                  {bookData.city} {bookData.location} {bookData.boxNumber}관
                </Box>
                <Flex gap={2}>
                  <Box>상영일시: {bookData.startTime.slice(0, 10)} / </Box>
                  <Box>
                    {bookData.startTime.slice(11, 16) +
                      "~" +
                      bookData.endTime.slice(11, 16)}
                  </Box>
                </Flex>

                <Box>인원: {bookData.numberOfPeople}명</Box>
                <Flex gap={1} h={"50px"} w={"100%"}>
                  <Box w={"38px"}>좌석:</Box>
                  <Flex w={"250px"} flexWrap={"wrap"} gap={1}>
                    {bookData.seatSelected.map((seat, index) => {
                      if (index !== bookData.seatSelected.length - 1) {
                        return <Box key={index}>{seat + ","}</Box>;
                      } else {
                        return <Box key={index}>{seat}</Box>;
                      }
                    })}
                  </Flex>
                </Flex>
                <Box
                  borderRadius={"10px"}
                  w={"480px"}
                  h={"320px"}
                  bgColor={"darkslategray"}
                  align={"center"}
                  alignContent={"center"}
                >
                  <Box color={"whiteAlpha.800"} h={"20px"} mb={1}>
                    메인 예고편
                  </Box>
                  {vodUrl ===
                  "https://www.kmdb.or.kr/trailer/play/undefined" ? (
                    <Box
                      color={"whiteAlpha.800"}
                      w={"480px"}
                      h={"270px"}
                      bg={"black"}
                      alignContent={"center"}
                      fontSize={"24px"}
                    >
                      현재 광고중인 예고편이 없습니다.
                    </Box>
                  ) : vodUrl.length > 0 ? (
                    <ReactPlayer
                      url={vodUrl}
                      playing
                      muted
                      loop
                      width="480px"
                      height="270px"
                    />
                  ) : (
                    <Spinner />
                  )}
                  <Box h={"20px"}></Box>
                </Box>
              </Stack>
            </Flex>

            <Stack
              align={"end"}
              p={4}
              bg={"blackAlpha.200"}
              h={"125px"}
              borderRadius={"10px"}
            >
              <Box fontWeight={"600"} fontSize={"lg"} mr={1}>
                총 결제 금액:{" "}
                {bookData.totalAmount.toString().slice(-6, -3) +
                  "," +
                  bookData.totalAmount.toString().slice(-3)}
                원
              </Box>
              <Flex>
                <Button
                  bgColor={"yellow"}
                  leftIcon={<RiKakaoTalkFill size={"20px"} />}
                  _hover={{
                    bgColor: "#e0e008",
                  }}
                  _dark={{
                    bgColor: "#d6d604",
                    color: "black",
                    _hover: {
                      bgColor: "#d3d334",
                    },
                  }}
                  onClick={() => {
                    onClickKakaopay();
                  }}
                >
                  <Text>카카오 페이</Text>
                </Button>
                <ColorButton onClick={() => onClickInicsis()}>
                  <FontAwesomeIcon icon={faCreditCard} />
                  <Box ml={2}>카드 결제</Box>
                </ColorButton>
              </Flex>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

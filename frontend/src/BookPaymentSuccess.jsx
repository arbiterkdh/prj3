import { useContext, useEffect, useState } from "react";
import { LoginContext } from "./component/LoginProvider.jsx";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import { Box, Heading, Image } from "@chakra-ui/react";

export function BookPaymentSuccess() {
  const { setBookProgress } = useOutletContext();
  const [paymentData, setPaymentData] = useState([]);
  const account = useContext(LoginContext);
  const location = useLocation();
  const { paymentId } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    setBookProgress(4);
    axios
      .get(`/api/book/payment/orderDataList/${account.id}/${paymentId}`)
      .then((res) => {
        setPaymentData(res.data);
        console.log(res.data);
      })
      .catch(() => {})
      .finally(() => {});
  }, []);

  return (
    <Box w={"878px"} h={"700px"} borderLeft={"1px"}>
      <Box
        h={"50px"}
        borderY={"1px"}
        align={"center"}
        alignContent={"center"}
        fontSize={"20px"}
        fontWeight={"600"}
      >
        결제 완료 / 티켓 확인
      </Box>
      <Box
        w={"877px"}
        h={"450px"}
        bgColor={"darkslategray"}
        align={"center"}
        alignContent={"center"}
        position={"relative"}
      >
        <Box position={"absolute"}>
          <Heading>제목</Heading>
          <Box>극장</Box>
          <Box>지점</Box>
          <Box>좌석</Box>
          <Box>상영일시</Box>
        </Box>
        <Image
          w={"780px"}
          src={
            "https://myawsbucket-arbiterkdh.s3.ap-northeast-2.amazonaws.com/prj3/main/ccv_ticket-removebg-preview.png"
          }
        />
      </Box>
    </Box>
  );
}

export default BookPaymentSuccess;

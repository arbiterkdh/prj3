import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../component/LoginProvider.jsx";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import { BookTicketView } from "../BookTicketView.jsx";

export function BookPaymentSuccess() {
  const { setBookProgress } = useOutletContext();
  const [bookTicketData, setBookTicketData] = useState([]);
  const account = useContext(LoginContext);
  const location = useLocation();
  const { paymentId } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    setBookProgress(4);
    axios
      .get(`/api/book/payment/orderDataList/${account.id}/${paymentId}`)
      .then((res) => {
        setBookTicketData(res.data);
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
      <BookTicketView bookTicketData={bookTicketData} />
    </Box>
  );
}

export default BookPaymentSuccess;

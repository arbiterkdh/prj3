import { Center } from "@chakra-ui/react";
import CenterBox from "../../../css/theme/component/box/CenterBox.jsx";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../../../component/LoginProvider.jsx";

function PaymentSuccess() {
  const [paymentData, setPaymentData] = useState([]);
  const Login = useContext(LoginContext);

  useEffect(() => {
    axios
      .get(`/api/store/payment/orderDataList/${Login.id}`)
      .then((res) => {
        setPaymentData(res.data);
      })
      .catch(() => {})
      .finally(() => {});
  }, []);
  return (
    <Center>
      <CenterBox>결제가 완료되었습니다</CenterBox>
    </Center>
  );
}

export default PaymentSuccess;

import { Center } from "@chakra-ui/react";
import CenterBox from "../../../css/theme/component/box/CenterBox.jsx";
import { useEffect } from "react";
import axios from "axios";

function PaymentSuccess() {
  useEffect(() => {
    axios.get();
  }, []);
  return (
    <Center>
      <CenterBox>결제가 완료되었습니다</CenterBox>
    </Center>
  );
}

export default PaymentSuccess;

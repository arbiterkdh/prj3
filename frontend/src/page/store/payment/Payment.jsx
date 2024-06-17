import React, { useContext, useEffect } from "react";
import { Box, Button } from "@chakra-ui/react";
import { LoginContext } from "../../../component/LoginProvider.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Payment() {
  const Login = useContext(LoginContext);
  const navigate = useNavigate();

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

  const onClickTestInfo = () => {
    const { IMP } = window;
    if (!IMP) return;

    function makeMerchantUid() {
      let today = new Date();
      let hours = today.getHours();
      let minutes = today.getMinutes();
      let seconds = today.getSeconds();
      let milliseconds = today.getMilliseconds();
      return `${hours}` + `${minutes}` + `${seconds}` + `${milliseconds}`;
    }

    IMP.request_pay(
      {
        pg: "html5_inicis.INIpayTest",
        pay_method: "card",
        merchant_uid: "order_no_" + makeMerchantUid(),
        name: `${Login.nickName} 결제테스트`,
        amount: 1,
        buyer_email: Login.email,
        buyer_name: Login.nickName,
        buyer_tel: "010-1234-5678", //필수 파라미터 입니다.
        buyer_addr: "서울특별시 강남구 삼성동",
        buyer_postcode: "123-456",
        m_redirect_url: "{모바일에서 결제 완료 후 리디렉션 될 URL}",
        escrow: true, //에스크로 결제인 경우 설정
        vbank_due: "YYYYMMDD",
        bypass: {
          // PC 경우
          acceptmethod: "noeasypay", // 간편결제 버튼을 통합결제창에서 제외(PC)
          // acceptmethod: "cardpoint", // 카드포인트 사용시 설정(PC)
          // 모바일 경우
          P_RESERVED: "noeasypay=Y", // 간편결제 버튼을 통합결제창에서 제외(모바일)
          // P_RESERVED: "cp_yn=Y", // 카드포인트 사용시 설정(모바일)
          // P_RESERVED: "twotrs_bank=Y&iosapp=Y&app_scheme=your_app_scheme://", // iOS에서 계좌이체시 결제가 이뤄지던 앱으로 돌아가기
        },
        period: {
          from: "20200101", //YYYYMMDD
          to: "20201231", //YYYYMMDD
        },
      },
      function (rsp) {
        if (rsp.success) {
          console.log(rsp + "결제 성공");
          const success = rsp.success;
          const orderNumber = rsp.merchant_uid;
          const status = rsp.status;
          const amount = rsp.paid_amount;
          const buyerName = rsp.buyer_name;
          const buyerEmail = rsp.buyer_email;

          console.log(
            success +
              " " +
              orderNumber +
              " " +
              status +
              " " +
              amount +
              " " +
              buyerName +
              " " +
              buyerEmail,
          );

          axios
            .post("/api/store/payment/add", {
              success: rsp.success,
              orderNumber: rsp.merchant_uid,
              status: rsp.status,
              amount: rsp.paid_amount,
              buyerName: rsp.buyer_name,
              buyerEmail: rsp.buyer_email,
            })
            .then((res) => {})
            .catch(() => {})
            .finally(() => {});
          navigate("/store/payment/payment-success");
        } else {
          console.log(rsp + "결제 실패");
          axios
            .post("/api/store/payment/add", {
              success: rsp.success,
              orderNumber: rsp.merchant_uid,
              status: rsp.status,
              amount: rsp.paid_amount,
              buyerName: rsp.buyer_name,
              buyerEmail: rsp.buyer_email,
            })
            .then((res) => {})
            .catch(() => {})
            .finally(() => {});
        }
      },
    );
  };

  return (
    <Box>
      <Button onClick={onClickTestInfo}>결제 테스트</Button>
    </Box>
  );
}

export default Payment;

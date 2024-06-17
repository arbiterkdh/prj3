import React, { useContext, useEffect } from "react";
import { Box, Button } from "@chakra-ui/react";
import { LoginContext } from "../../../component/LoginProvider.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Payment({ totalSum, productCartList, checkCartId }) {
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
        name: `${productCartList[0].name} 외 ${productCartList.length - 1} 개`,
        amount: totalSum,
        buyer_email: Login.email,
        buyer_name: Login.nickName,
        buyer_tel: "010-1234-5678", //필수 파라미터 입니다.
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
          const success = rsp.success;
          const orderNumber = rsp.merchant_uid;
          const status = rsp.status;
          const amount = rsp.paid_amount;
          const buyerName = rsp.buyer_name;
          const buyerEmail = rsp.buyer_email;

          console.log(
            "success=" +
              success +
              ", orderNumber=" +
              orderNumber +
              ", status=" +
              status +
              ", amount= " +
              amount +
              ", buyerName=" +
              buyerName +
              ", buyerEmail=" +
              buyerEmail +
              ", member.no=" +
              Login.id,
          );

          axios
            .post("/api/store/payment/add", {
              success: rsp.success,
              orderNumber: rsp.merchant_uid,
              status: rsp.status,
              amount: rsp.paid_amount,
              buyerName: rsp.buyer_name,
              buyerEmail: rsp.buyer_email,
              memberNumber: Login.id,
              checkCartId,
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
      <Button
        onClick={() => {
          onClickTestInfo();
          console.log("checkId" + checkCartId);
        }}
      >
        결제 테스트
      </Button>
    </Box>
  );
}

export default Payment;

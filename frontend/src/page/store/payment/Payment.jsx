import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { LoginContext } from "../../../component/LoginProvider.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RiKakaoTalkFill } from "react-icons/ri";
import ColorButton from "../../../css/theme/component/button/ColorButton.jsx";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Payment({
  totalSum,
  productCartList,
  checkCartId,
  isDisabled,
  name,
  quantity,
  price,
  productId,
  isSinglePurchase,
  onPayClose,
}) {
  const Login = useContext(LoginContext);
  const navigate = useNavigate();
  const [paymentId, setPaymentId] = useState(null);

  let paymentName = isSinglePurchase
    ? name
    : productCartList.length > 1
      ? `${productCartList[0].name} 외 ${productCartList.length - 1} 개`
      : productCartList.length === 1
        ? productCartList[0].name
        : "";

  let paymentAmount = isSinglePurchase ? price : totalSum;

  function makeMerchantUid() {
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    // let milliseconds = today.getMilliseconds();
    return `OrderNo_${hours}${minutes}${seconds}`;
  }

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

  const onClickInicsis = () => {
    onPayClose();

    const { IMP } = window;
    if (!IMP) return;

    IMP.request_pay(
      {
        pg: "html5_inicis.INIpayTest",
        pay_method: "card",
        merchant_uid: makeMerchantUid(),
        name: paymentName,
        amount: paymentAmount,
        buyer_email: Login.email,
        buyer_name: Login.nickName,
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
            .post("/api/store/payment/add", {
              success: rsp.success,
              orderNumber: rsp.merchant_uid,
              status: rsp.status,
              amount: rsp.paid_amount,
              buyerName: rsp.buyer_name,
              buyerEmail: rsp.buyer_email,
              memberNumber: Login.id,
              checkCartId,
              productId,
              quantity,
              name,
            })
            .then((res) => {
              const paymentId = res.data;
              setPaymentId(paymentId);
              console.log("payment id 값 " + paymentId);
              navigate("/store/payment/payment-success", {
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
  };

  const onClickKakaopay = () => {
    onPayClose();

    const { IMP } = window;
    if (!IMP) return;

    IMP.request_pay(
      {
        pg: "kakaopay",
        pay_method: "card",
        merchant_uid: makeMerchantUid(),
        name: paymentName,
        amount: paymentAmount,
        buyer_email: Login.email,
        buyer_name: Login.nickName,
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
            .post("/api/store/payment/add", {
              success: rsp.success,
              orderNumber: rsp.merchant_uid,
              status: rsp.status,
              amount: rsp.paid_amount,
              buyerName: rsp.buyer_name,
              buyerEmail: rsp.buyer_email,
              memberNumber: Login.id,
              checkCartId,
              productId,
              quantity,
              name,
            })
            .then((res) => {
              const paymentId = res.data;
              setPaymentId(paymentId);
              console.log("payment id 값 " + paymentId);
              navigate("/store/payment/payment-success", {
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
  };

  return (
    <Box>
      <ColorButton
        leftIcon={<FontAwesomeIcon icon={faCartShopping} />}
        isDisabled={isDisabled}
        onClick={() => {
          onClickInicsis();
        }}
      >
        카드
      </ColorButton>
      <Button
        bgColor={"yellow"}
        leftIcon={<RiKakaoTalkFill size={"20px"} />}
        _hover={{
          bgColor: "#e0e008",
        }}
        isDisabled={isDisabled}
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
        <Text>페이</Text>
      </Button>
    </Box>
  );
}

export default Payment;

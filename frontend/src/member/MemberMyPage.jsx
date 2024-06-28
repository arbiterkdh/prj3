import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../component/LoginProvider.jsx";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  StackDivider,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import CenterBox from "../css/theme/component/box/CenterBox.jsx";
import GapFlex from "../css/theme/component/flex/GapFlex.jsx";
import { VerifyNumberToUpdate } from "./mail/VerifyNumberToUpdate.jsx";
import EventTypeLabel from "../page/promotion/component/PromoeventTypeLabels.jsx";

export function MemberMyPage() {
  const account = useContext(LoginContext);
  const [member, setMember] = useState({});
  const [address, setAddress] = useState("");
  const [selected, setSelected] = useState("");
  const [domain, setDomain] = useState("");
  const [verifyNumber, setVerifyNumber] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [paymentResult, setPaymentResult] = useState([]);
  const [pageInfoPaymentResult, setPageInfoPaymentResult] = useState({});
  const [pageInfoPaymentCancelResult, setPageInfoPaymentCancelResult] =
    useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [page, setPage] = useState(1);
  const [promoResults, setPromoResults] = useState([]);
  const navigate = useNavigate();

  const [paymentCancelResult, setPaymentCancelResult] = useState([]);
  const [cancelReason, setCancelReason] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [paymentId, setPaymentId] = useState(null);
  const [buyerName, setBuyerName] = useState("");
  const [amount, setAmount] = useState(0);

  const [selectPaymentResult, setSelectPaymentResult] = useState([]);
  const [selectPaymentCancelResult, setSelectPaymentCancelResult] = useState(
    [],
  );

  const {
    isOpen: isCancelOpen,
    onOpen: onCancelOpen,
    onClose: onCancelClose,
  } = useDisclosure();

  const {
    isOpen: isPaymentResultOpen,
    onOpen: onPaymentResultOpen,
    onClose: onPaymentResultClose,
  } = useDisclosure();

  const {
    isOpen: isPaymentCancelResultOpen,
    onOpen: onPaymentCancelResultOpen,
    onClose: onPaymentCancelResultClose,
  } = useDisclosure();

  const location = useLocation();
  const { nickName } = location.state;

  useEffect(() => {
    if (nickName) {
      axios
        .get(`/api/member/mypage/${nickName}`)
        .then((res) => {
          setMember(res.data);
        })
        .catch(() => {})
        .finally(() => {});
    }
  }, [nickName]);

  useEffect(() => {
    if (nickName) {
      axios
        .get(`/api/member/mypage/paymentResult/${nickName}`, {
          params: {
            page,
          },
        })
        .then((res) => {
          setPaymentResult(res.data.paymentResult);
          setPageInfoPaymentResult(res.data.pageInfo);
        })
        .catch(() => {})
        .finally(() => {});
    }
  }, [nickName, page]);

  useEffect(() => {
    axios
      .get(`/api/member/mypage/paymentCancelResult/${nickName}`, {
        params: {
          page,
        },
      })
      .then((res) => {
        setPaymentCancelResult(res.data.paymentCancelResult);
        setPageInfoPaymentCancelResult(res.data.pageInfo);
      })
      .catch(() => {})
      .finally(() => {});
  }, [nickName, page]);

  useEffect(() => {
    if (member.number) {
      axios
        .get(`/api/promotion/eventResult`, {
          params: {
            memberNumber: member.number,
          },
        })
        .then((res) => {
          setPromoResults(res.data.results);
        })
        .catch(() => {})
        .finally(() => {});
    }
  }, [member.number]);

  function handleClick() {
    axios
      .post("/api/mail/useCheck", { address: address + "@" + domain })
      .then((res) => {
        onOpen();
        sendVerifyNumber();
      })
      .catch((err) => {})
      .finally();
  }

  function sendVerifyNumber() {
    setIsSending(true);
    setIsRunning(true);
    axios
      .post("/api/mail", { address: address + "@" + domain })
      .then((res) => {
        toast({
          status: "success",
          description:
            "이메일로 인증번호가 전송되었습니다, 이메일을 확인해주세요.",
          position: "bottom-right",
        });
        setVerifyNumber(res.data.verifyNumber);
        setVerifiedEmail(address + "@" + domain);
      })
      .catch()
      .finally(() => {
        setAddress("");
        setIsSending(false);
      });
  }

  const pageNumbersPaymentResult = [];

  for (
    let i = pageInfoPaymentResult.leftPageNumber;
    i <= pageInfoPaymentResult.rightPageNumber;
    i++
  ) {
    pageNumbersPaymentResult.push(i);
  }

  const pageNumbersPaymentCancelResult = [];
  for (
    let i = pageInfoPaymentCancelResult.leftPageNumber;
    i <= pageInfoPaymentCancelResult.rightPageNumber;
    i++
  ) {
    pageNumbersPaymentCancelResult.push(i);
  }

  function handlePaymentCancel() {
    axios
      .post("/api/store/payment/cancel", {
        orderNumber,
        paymentId,
        requestor: buyerName,
        cancelReason,
        amount,
      })
      .then((res) => {
        console.log("취소:" + res.data);
      })
      .catch((err) => {
        console.error("취소 오류:" + err);
      })
      .finally(() => {
        onCancelClose();
      });
  }

  function handlePaymentOrderItem(paymentId) {
    console.log(paymentId);
    axios
      .get(`/api/member/mypage/paymentOrderItem/${paymentId}`)
      .then((res) => {
        setSelectPaymentResult(res.data);
        onPaymentResultOpen();
      })
      .catch(() => {})
      .finally(() => {});
  }

  function handlePaymentCancelItem(cancelOrderNumber) {
    axios
      .get(`/api/member/mypage/paymentCancelItem/${cancelOrderNumber}`)
      .then((res) => {
        setSelectPaymentCancelResult(res.data);
        onPaymentCancelResultOpen();
      })
      .catch(() => {})
      .finally(() => {});
  }

  return (
    <Center>
      <CenterBox>
        <Heading size="md">마이페이지</Heading>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>회원정보</Tab>
            <Tab>비밀번호 변경</Tab>
            <Tab>예매내역</Tab>
            <Tab>결제내역({pageInfoPaymentResult.totalCount})</Tab>
            <Tab>취소내역({pageInfoPaymentCancelResult.totalCount})</Tab>
            <Tab>응모결과확인</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Card>
                <CardHeader></CardHeader>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing="4">
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        이메일
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {member.email}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        닉네임
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {member.nickName}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        가입일
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {member.inserted}
                      </Text>
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            </TabPanel>
            <TabPanel>
              <Heading>이메일 본인인증</Heading>
              <GapFlex alignItems={"center"}>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value.trim())}
                  placeholder={"이메일 주소"}
                />
                <Box fontSize={"2xl"}>@</Box>
                <Select
                  border={"1px solid"}
                  onChange={(e) => {
                    setSelected(e.target.value);
                  }}
                >
                  <option value="">직접 입력</option>
                  <option value="naver.com">naver.com</option>
                  <option value="daum.net">daum.net</option>
                  <option value="hanmail.net">hanmail.net</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="kakao.com">kakao.com</option>
                  <option value="nate.com">nate.com</option>
                  <option value="hotmail.com">hotmail.com</option>
                </Select>
                <Input
                  isDisabled={selected !== ""}
                  value={domain}
                  placeholder={"직접 입력"}
                  onChange={(e) => {
                    setDomain(e.target.value);
                  }}
                />
                <Button w={"40%"} onClick={handleClick}>
                  인증번호 요청
                </Button>
              </GapFlex>
              <VerifyNumberToUpdate
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
                isRunning={isRunning}
                setIsRunning={setIsRunning}
                verifyNumber={verifyNumber}
                setVerifyNumber={setVerifyNumber}
                isSending={isSending}
                verifiedAddress={verifiedEmail}
                setVerifiedAddress={setVerifiedEmail}
              />
            </TabPanel>
            <TabPanel>예매내역</TabPanel>
            <TabPanel>
              결제내역
              <Table>
                <Thead>
                  <Tr>
                    <Th w={"30%"}>주문 번호</Th>
                    <Th w={"30%"}>주문일</Th>
                    <Th w={"10%"}>합계</Th>
                    <Th w={"10%"}>취소</Th>
                    <Th w={"20%"}>상태</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {paymentResult.map((resultItem) => (
                    <Tr key={resultItem.id}>
                      <Td
                        onClick={() => {
                          handlePaymentOrderItem(resultItem.id);
                        }}
                        cursor={"pointer"}
                      >
                        {resultItem.orderNumber}
                      </Td>
                      <Td>{resultItem.buyerDate}</Td>
                      <Td>{resultItem.amount}원</Td>
                      <Td>
                        {resultItem.status === "paid" ? (
                          <Button
                            onClick={() => {
                              onCancelOpen();
                              setOrderNumber(resultItem.orderNumber);
                              setPaymentId(resultItem.id);
                              setBuyerName(resultItem.buyerName);
                              setAmount(resultItem.amount);
                            }}
                          >
                            취소
                          </Button>
                        ) : (
                          <Text>취소완료</Text>
                        )}
                      </Td>
                      {resultItem.status === "paid" ? (
                        <Td>결제완료</Td>
                      ) : (
                        <Td>결제취소</Td>
                      )}
                    </Tr>
                  ))}
                  {paymentResult.length > 0 && (
                    <Tr>
                      <Td>
                        {pageInfoPaymentResult.prevPageNumber && (
                          <>
                            <Button onClick={() => setPage(1)}>
                              <FontAwesomeIcon icon={faAnglesLeft} />
                            </Button>
                            <Button
                              onClick={() =>
                                setPage(pageInfoPaymentResult.prevPageNumber)
                              }
                            >
                              <FontAwesomeIcon icon={faAngleLeft} />
                            </Button>
                          </>
                        )}
                        {pageNumbersPaymentResult.map(
                          (pageNumber) =>
                            pageNumber !== 0 && (
                              <Button
                                onClick={() => setPage(pageNumber)}
                                key={pageNumber}
                                colorScheme={
                                  pageNumber ===
                                  pageInfoPaymentResult.currentPageNumber
                                    ? "blue"
                                    : "gray"
                                }
                              >
                                {pageNumber}
                              </Button>
                            ),
                        )}

                        {pageInfoPaymentResult.nextPageNumber && (
                          <>
                            <Button
                              onClick={() =>
                                setPage(pageInfoPaymentResult.nextPageNumber)
                              }
                            >
                              <FontAwesomeIcon icon={faAngleRight} />
                            </Button>
                            <Button
                              onClick={() =>
                                setPage(pageInfoPaymentResult.lastPageNumber)
                              }
                            >
                              <FontAwesomeIcon icon={faAnglesRight} />
                            </Button>
                          </>
                        )}
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TabPanel>
            <TabPanel>
              상세 취소내역
              <Table>
                <Thead>
                  <Tr>
                    <Th>주문 번호</Th>
                    <Th>가격</Th>
                    <Th>결제카드</Th>
                    <Th>카드번호</Th>
                    <Th>영수증</Th>
                    <Th>승인상태</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {paymentCancelResult.map(
                    (resultItem, index) =>
                      paymentCancelResult.findIndex(
                        (item) => item.orderNumber === resultItem.orderNumber,
                      ) === index && (
                        <Tr key={index}>
                          <Td
                            onClick={() => {
                              handlePaymentCancelItem(resultItem.orderNumber);
                            }}
                            cursor={"pointer"}
                          >
                            {resultItem.orderNumber}
                          </Td>
                          <Td>{resultItem.amount}원</Td>
                          <Td>{resultItem.cardName}</Td>
                          <Td>{resultItem.cardNumber}</Td>
                          <Td>
                            <Link
                              href={resultItem.receiptUrl}
                              target={"_blank"}
                            >
                              <Button>확인</Button>
                            </Link>
                          </Td>
                          {resultItem.status === "paid" ? (
                            <Td></Td>
                          ) : (
                            <Td fontSize={"sm"}>취소완료</Td>
                          )}
                        </Tr>
                      ),
                  )}

                  {paymentCancelResult.length > 0 && (
                    <Tr>
                      <Td>
                        {pageInfoPaymentCancelResult.prevPageNumber && (
                          <>
                            <Button onClick={() => setPage(1)}>
                              <FontAwesomeIcon icon={faAnglesLeft} />
                            </Button>
                            <Button
                              onClick={() =>
                                setPage(
                                  pageInfoPaymentCancelResult.prevPageNumber,
                                )
                              }
                            >
                              <FontAwesomeIcon icon={faAngleLeft} />
                            </Button>
                          </>
                        )}
                        {pageNumbersPaymentCancelResult.map(
                          (pageNumber) =>
                            pageNumber !== 0 && (
                              <Button
                                onClick={() => setPage(pageNumber)}
                                key={pageNumber}
                                colorScheme={
                                  pageNumber ===
                                  pageInfoPaymentCancelResult.currentPageNumber
                                    ? "blue"
                                    : "gray"
                                }
                              >
                                {pageNumber}
                              </Button>
                            ),
                        )}

                        {pageInfoPaymentCancelResult.nextPageNumber && (
                          <>
                            <Button
                              onClick={() =>
                                setPage(
                                  pageInfoPaymentCancelResult.nextPageNumber,
                                )
                              }
                            >
                              <FontAwesomeIcon icon={faAngleRight} />
                            </Button>
                            <Button
                              onClick={() =>
                                setPage(
                                  pageInfoPaymentCancelResult.lastPageNumber,
                                )
                              }
                            >
                              <FontAwesomeIcon icon={faAnglesRight} />
                            </Button>
                          </>
                        )}
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TabPanel>
            <TabPanel>
              <Heading>나의 응모 내역</Heading>
              <Table>
                <Thead>
                  <Tr>
                    <Th>번호</Th>
                    <Th>분류</Th>
                    <Th>이벤트명</Th>
                    <Th>당첨자 발표</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {promoResults.map((result, index) => (
                    <Tr key={index}>
                      <Td>{index + 1}</Td>
                      <Td>
                        <EventTypeLabel eventType={result.eventType} />
                      </Td>
                      <Td>{result.eventName}</Td>
                      <Td>
                        <Button
                          colorScheme={"blue"}
                          onClick={() => navigate("/promotion/eventResult")}
                        >
                          결과확인
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Modal isOpen={isCancelOpen} onClose={onCancelClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <ModalHeader>취소사유 입력</ModalHeader>
              <Textarea
                placeholder={"취소사유를 작성해주세요"}
                onChange={(e) => setCancelReason(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => handlePaymentCancel()}>확인</Button>
              <Button onClick={() => onCancelClose()}>취소</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal isOpen={isPaymentResultOpen} onClose={onPaymentResultClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>결제상품조회</ModalHeader>
            <ModalBody>
              <Table>
                <Thead>
                  <Tr>
                    <Th>상품명</Th>
                    <Th>수량</Th>
                    <Th>가격</Th>
                    <Th>합계</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {selectPaymentResult.map((resultItem, itemIndex) => (
                    <Tr key={itemIndex}>
                      <Td>{resultItem.name}</Td>
                      <Td>{resultItem.quantity}</Td>
                      <Td>{resultItem.price}원</Td>
                      <Td>{resultItem.totalPrice}원</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onPaymentResultClose}>확인</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal
          isOpen={isPaymentCancelResultOpen}
          onClose={onPaymentCancelResultClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>알림</ModalHeader>
            <ModalBody>
              <Table>
                <Thead>
                  <Tr>
                    <Th>상품명</Th>
                    <Th>수량</Th>
                    <Th>가격</Th>
                    <Th>합계</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {selectPaymentCancelResult.map((resultItem, itemIndex) => (
                    <Tr key={itemIndex}>
                      <Td>{resultItem.cancelName}</Td>
                      <Td>{resultItem.cancelQuantity}</Td>
                      <Td>{resultItem.cancelPrice}원</Td>
                      <Td>{resultItem.cancelTotalPrice}원</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onPaymentCancelResultClose}>확인</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </CenterBox>
    </Center>
  );
}

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
  const [pageInfo, setPageInfo] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [page, setPage] = useState(1);
  const [promoResults, setPromoResults] = useState([]);
  const navigate = useNavigate();

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
          setPageInfo(res.data.pageInfo);
        })
        .catch(() => {})
        .finally(() => {});
    }
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

  const pageNumbers = [];

  for (let i = pageInfo.leftPageNumber; i <= pageInfo.rightPageNumber; i++) {
    pageNumbers.push(i);
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
            <Tab>결제내역</Tab>
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
              결제내역({pageInfo.totalCount})
              <Table>
                <Thead>
                  <Tr>
                    <Th>주문 번호</Th>
                    <Th>주문일</Th>
                    <Th>상품명</Th>
                    <Th>수량</Th>
                    <Th>가격</Th>
                    <Th>총가격</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {paymentResult.map((resultItem, index) => (
                    <Tr key={index}>
                      <Td>{resultItem.orderNumber}</Td>
                      <Td>{resultItem.buyerDate}</Td>
                      <Td>{resultItem.name}</Td>
                      <Td>{resultItem.quantity}</Td>
                      <Td>{resultItem.price}</Td>
                      <Td>{resultItem.totalPrice}</Td>
                    </Tr>
                  ))}
                  <Tr>
                    <Td>
                      {pageInfo.prevPageNumber && (
                        <>
                          <Button onClick={() => setPage(1)}>
                            <FontAwesomeIcon icon={faAnglesLeft} />
                          </Button>
                          <Button
                            onClick={() => setPage(pageInfo.prevPageNumber)}
                          >
                            <FontAwesomeIcon icon={faAngleLeft} />
                          </Button>
                        </>
                      )}
                      {pageNumbers.map(
                        (pageNumber) =>
                          pageNumber !== 0 && (
                            <Button
                              onClick={() => setPage(pageNumber)}
                              key={pageNumber}
                              colorScheme={
                                pageNumber === pageInfo.currentPageNumber
                                  ? "blue"
                                  : "gray"
                              }
                            >
                              {pageNumber}
                            </Button>
                          ),
                      )}

                      {pageInfo.nextPageNumber && (
                        <>
                          <Button
                            onClick={() => setPage(pageInfo.nextPageNumber)}
                          >
                            <FontAwesomeIcon icon={faAngleRight} />
                          </Button>
                          <Button
                            onClick={() => setPage(pageInfo.lastPageNumber)}
                          >
                            <FontAwesomeIcon icon={faAnglesRight} />
                          </Button>
                        </>
                      )}
                    </Td>
                  </Tr>
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
      </CenterBox>
    </Center>
  );
}

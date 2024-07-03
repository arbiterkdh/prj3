import { useParams } from "react-router-dom";
import {
  Box,
  Center,
  Flex,
  Image,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../../../../component/LoginProvider.jsx";
import QnA from "./qna/QnA.jsx";
import Comment from "./comment/Comment.jsx";
import CenterBox from "../../../../css/theme/component/box/CenterBox.jsx";
import AddQnAModal from "./qna/AddQnAModal.jsx";

export function StoreProductView() {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [listQnA, setListQnA] = useState([]);
  const Login = useContext(LoginContext);

  const [pageInfo, setPageInfo] = useState({});
  const [page, setPage] = useState(1);
  const {
    isOpen: isQnAOpen,
    onOpen: onQnAOpen,
    onClose: onQnAClose,
  } = useDisclosure();

  useEffect(() => {
    axios
      .get(`/api/store/product/view/${productId}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log("====" + err);
      })
      .finally(() => {});
  }, []);

  const listQnARefresh = () => {
    axios
      .get(`/api/store/product/qna/list/${productId}`, {
        params: { page },
      })
      .then((res) => {
        setListQnA(res.data.listQnA);
        setPageInfo(res.data.pageInfo);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Center>
      <CenterBox mb={10}>
        <Box>
          <hr />
        </Box>
        <Flex w={"100%"}>
          <Box w={"50%"} p={20}>
            <Image src={product.image ? product.image.src : ""} />
          </Box>
          <Flex
            w={"50%"}
            p={20}
            style={{
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box padding={"10px"}>
              <Text fontSize="2xl">{product.name}</Text>
            </Box>
            <Box padding={"10px"}>
              <Text fontSize="md">남은 수량:{product.stock}</Text>
            </Box>
          </Flex>
        </Flex>

        <Box>
          <hr />
        </Box>

        <Box>
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em" borderBottom={"none"}>
              <Tab
                borderBottom={"1px solid lightgray"}
                _selected={{
                  border: "1px solid lightgray",
                  borderBottom: "1px solid #FEFEFE",
                }}
                _dark={{
                  _selected: {
                    color: "white",
                    border: "1px solid lightgray",
                    borderBottom: "1px solid #1F3032",
                  },
                }}
              >
                상세내용
              </Tab>
              <Tab
                borderBottom={"1px solid lightgray"}
                _selected={{
                  border: "1px solid lightgray",
                  borderBottom: "1px solid #FEFEFE",
                }}
                _dark={{
                  _selected: {
                    color: "white",
                    border: "1px solid lightgray",
                    borderBottom: "1px solid #1F3032",
                  },
                }}
              >
                코멘트
              </Tab>
              <Tab
                borderBottom={"1px solid lightgray"}
                _selected={{
                  border: "1px solid lightgray",
                  borderBottom: "1px solid #FEFEFE",
                }}
                _dark={{
                  _selected: {
                    color: "white",
                    border: "1px solid lightgray",
                    borderBottom: "1px solid #1F3032",
                  },
                }}
              >
                문의
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Textarea
                  fontSize={"xl"}
                  value={product.content}
                  style={{ resize: "none" }}
                ></Textarea>
              </TabPanel>
              <TabPanel>
                <Comment
                  commentList={commentList}
                  setCommentList={setCommentList}
                  Login={Login}
                  productId={productId}
                />
              </TabPanel>
              <TabPanel>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th w={"70%"}>문의내용</Th>
                        <Th w={"10%"}>작성자</Th>
                        <Th w={"20%"}>작성일</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <QnA
                        productId={productId}
                        Login={Login}
                        listQnA={listQnA}
                        setListQnA={setListQnA}
                        listQnARefresh={listQnARefresh}
                        onQnAOpen={onQnAOpen}
                        page={page}
                        setPage={setPage}
                        pageInfo={pageInfo}
                        setPageInfo={setPageInfo}
                      />
                    </Tbody>
                  </Table>
                </TableContainer>
                <AddQnAModal
                  isQnAOpen={isQnAOpen}
                  onQnAClose={onQnAClose}
                  productId={productId}
                  Login={Login}
                  listQnARefresh={listQnARefresh}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </CenterBox>
    </Center>
  );
}

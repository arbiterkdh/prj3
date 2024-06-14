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
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../../../../component/LoginProvider.jsx";
import QnA from "./qna/QnA.jsx";
import Comment from "./comment/Comment.jsx";
import CenterBox from "../../../../css/theme/component/box/CenterBox.jsx";

export function StoreProductView() {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [listQnA, setListQnA] = useState([]);
  const Login = useContext(LoginContext);

  useEffect(() => {
    axios
      .get(`/api/store/product/view/${productId}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch(() => {})
      .finally(() => {});
  }, []);

  return (
    <Center>
      <CenterBox mb={10}>
        <Box>
          <hr />
        </Box>
        <Flex w={"100%"}>
          <Box w={"50%"} p={20}>
            <Image src={product.image.src} />
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
            <TabList mb="1em">
              <Tab>상세내용</Tab>
              <Tab>코멘트</Tab>
              <Tab>문의</Tab>
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
                      />
                    </Tbody>
                  </Table>
                </TableContainer>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </CenterBox>
    </Center>
  );
}

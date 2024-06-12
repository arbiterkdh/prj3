import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../../../../component/LoginProvider.jsx";
import QnA from "./qna/QnA.jsx";
import Comment from "./comment/Comment.jsx";

export function StoreProductView() {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [commentContent, setCommentContent] = useState("");

  const [commentList, setCommentList] = useState([]);
  const [commentId, setCommentId] = useState(null);
  // const [idQnA, setIdQnA] = useState(null);
  const toast = useToast();
  const Login = useContext(LoginContext);
  const [page, setPage] = useState(1);

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  const {
    isOpen: isModifyOpen,
    onOpen: onModifyOpen,
    onClose: onModifyClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  useEffect(() => {
    axios
      .get(`/api/store/product/view/${productId}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch(() => {})
      .finally(() => {});
  }, []);

  const commentListRefresh = () => {
    console.log("page:" + page);
    axios
      .get(`/api/store/product/comment/list/${productId}`, {
        params: {
          page,
        },
      })
      .then((res) => {
        setCommentList(res.data.commentList);
      })
      .catch(() => {})
      .finally(() => {});
  };

  function handleCommentModify(commentId, commentContent) {
    axios
      .put("/api/store/product/comment/modify", {
        id: commentId,
        content: commentContent,
      })
      .then(() => {
        toast({
          status: "success",
          description: "코멘트 수정 완료",
          position: "bottom",
        });
        commentListRefresh();
      })
      .catch(() => {})
      .finally(() => {
        onModifyClose();
      });
  }

  return (
    <Box>
      <Box>
        <hr />
      </Box>
      <Flex w={"100%"}>
        <Box w={"50%"} p={20}>
          <Image
            src={`http://127.0.0.1:8888/${product.id}/${product.fileName}`}
          />
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
                Login={Login}
                commentListRefresh={commentListRefresh}
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
                    <QnA productId={productId} Login={Login} />
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      {/*<AddQnAModal />*/}

      <Modal isOpen={isModifyOpen} onClose={onModifyClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>코멘트를 수정하시겠습니까?</ModalHeader>
          <ModalBody>
            <Input
              type={"text"}
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Flex>
              <Button
                onClick={() => handleCommentModify(commentId, commentContent)}
              >
                확인
              </Button>
              <Button onClick={onModifyClose}>취소</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/*<DeleteCommentModal />*/}
    </Box>
  );
}

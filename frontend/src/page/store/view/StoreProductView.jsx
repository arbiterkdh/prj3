import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../../../component/LoginProvider.jsx";

export function StoreProductView() {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [commentId, setCommentId] = useState(null);

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

  const toast = useToast();

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

  const commentListRefresh = () => {
    axios
      .get(`/api/store/product/comment/list/${productId}`)
      .then((res) => {
        setCommentList(res.data);
      })
      .catch(() => {})
      .finally(() => {});
  };

  useEffect(() => {
    commentListRefresh();
  }, []);

  function handleCommentAdd(id, commentContent) {
    axios
      .post("/api/store/product/comment/add", {
        productId: id,
        content: commentContent,
        writer: Login.nickName,
      })
      .then(() => {
        toast({
          status: "success",
          description: "한줄평 작성 성공",
          position: "bottom",
        });
        commentListRefresh();
      })
      .catch(() => {})
      .finally(() => {
        onAddClose();
      });
  }

  const CommentItem = ({ commentItem }) => {
    return (
      <Box>
        <Flex w={"100%"} textAlign={"center"}>
          <Box w={"60%"}>{commentItem.content}</Box>
          <Box w={"20%"}>
            {commentItem.writer}

            {commentItem.writer === Login.nickName && (
              <>
                <Button
                  onClick={() => {
                    setCommentId(commentItem.id);
                    onDeleteOpen();
                  }}
                >
                  삭제
                </Button>
                <Button
                  onClick={() => {
                    onModifyOpen();
                    setCommentContent(commentItem.content);
                    setCommentId(commentItem.id);
                  }}
                >
                  수정
                </Button>
              </>
            )}
          </Box>
          <Box w={"20%"}>{commentItem.regDate}</Box>
        </Flex>
      </Box>
    );
  };

  const ProductCommentList = ({ commentList }) => {
    return (
      <Box>
        {commentList.map((commentItem) => (
          <CommentItem key={commentItem.id} commentItem={commentItem} />
        ))}
      </Box>
    );
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

  function handleCommentDelete(commentId) {
    axios
      .delete(`/api/store/product/comment/delete/${commentId}`)
      .then(() => {
        toast({
          status: "success",
          description: "코멘트 삭제 완료",
          position: "bottom",
        });
        commentListRefresh();
      })
      .catch(() => {})
      .finally(() => {
        onDeleteClose();
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
              <ProductCommentList commentList={commentList} />
              <hr />
              <Text fontSize={"lg"}>한줄평</Text>
              <Flex w={"100%"}>
                <Box w={"70%"} style={{}}>
                  <Box w={"100%"}>
                    <FormControl>
                      <Input
                        color="teal"
                        placeholder="내용을 작성하세요"
                        _placeholder={{ opacity: 1, color: "gray.500" }}
                        onChange={(e) => {
                          setCommentContent(e.target.value);
                        }}
                      />
                    </FormControl>
                  </Box>
                </Box>
                <Box
                  w={"30%"}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Box>
                    <Button
                      colorScheme={"red"}
                      onClick={() => {
                        setCommentContent(commentContent);
                        onAddOpen();
                      }}
                    >
                      확인
                    </Button>
                  </Box>
                </Box>
              </Flex>
            </TabPanel>
            <TabPanel>
              <p fontSize={"xl"}>문의</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Modal isOpen={isAddOpen} onClose={onAddClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>등록알림</ModalHeader>
          <ModalBody>코멘트를 작성하시겠습니까?</ModalBody>
          <ModalFooter>
            <Flex>
              <Button
                onClick={() => handleCommentAdd(productId, commentContent)}
              >
                확인
              </Button>
              <Button onClick={onAddClose}>취소</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>

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

      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>삭제 알림</ModalHeader>
          <ModalBody>코멘트 삭제하시겠습니까?</ModalBody>
          <ModalFooter>
            <Flex>
              <Button
                onClick={() => {
                  handleCommentDelete(commentId);
                }}
              >
                확인
              </Button>
              <Button onClick={onAddClose}>취소</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

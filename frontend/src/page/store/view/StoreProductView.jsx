import { useParams } from "react-router-dom";
import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Tab,
  Table,
  TableContainer,
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
import React, { useContext, useEffect, useState } from "react";
import FocusLock from "react-focus-lock";
import axios from "axios";
import { LoginContext } from "../../../component/LoginProvider.jsx";

export function StoreProductView() {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [commentId, setCommentId] = useState(null);
  const [idQnA, setIdQnA] = useState(null);
  const [titleQnA, setTitleQnA] = useState("");
  const [contentQnA, setContentQnA] = useState("");
  const [listQnA, setListQnA] = useState([]);
  const toast = useToast();
  const Login = useContext(LoginContext);
  const [page, setPage] = useState(1);

  function listQnARefresh() {
    axios
      .get("/api/store/product/qna/list")
      .then((res) => {
        setListQnA(res.data);
      })
      .catch(() => {})
      .finally(() => {});
  }

  useEffect(() => {
    axios
      .get("/api/store/product/qna/list")
      .then((res) => {
        setListQnA(res.data);
      })
      .catch(() => {})
      .finally(() => {});
  }, []);

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

  const {
    isOpen: isQnAOpen,
    onOpen: onQnAOpen,
    onClose: onQnAClose,
  } = useDisclosure();

  const {
    isOpen: isQnAContentOpen,
    onOpen: onQnAContentOpen,
    onClose: onQnAContentClose,
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

  useEffect(() => {
    commentListRefresh();
  }, [page]);

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
                <Badge
                  onClick={() => {
                    setCommentId(commentItem.id);
                    onDeleteOpen();
                  }}
                >
                  삭제
                </Badge>
                <Badge
                  onClick={() => {
                    onModifyOpen();
                    setCommentContent(commentItem.content);
                    setCommentId(commentItem.id);
                  }}
                >
                  수정
                </Badge>
              </>
            )}
          </Box>
          <Box w={"20%"}>{commentItem.regDate}</Box>
        </Flex>
      </Box>
    );
  };

  const QnACommentAnswerList = () => {};

  function handleQnADelete(id) {
    axios
      .delete(`/api/store/product/qna/delete/${id}`)
      .then(() => {
        toast({
          status: "success",
          description: "문의 글 삭제 성공",
          position: "bottom",
        });
        listQnARefresh();
      })
      .catch(() => {})
      .finally(() => {});
  }

  function handleQnAModify(id, title, content) {
    axios
      .put("/api/store/product/qna/modify", {
        id: id,
        title: title,
        content: content,
      })
      .then((res) => {
        toast({
          status: "success",
          description: "문의글 수정 완료",
          position: "bottom",
        });
        listQnARefresh();
      })
      .catch(() => {})
      .finally(() => {});
  }

  const QnAItem = ({ itemQnA }) => {
    const {
      isOpen: isQnAModifyOpen,
      onOpen: onQnAModifyOpen,
      onClose: onQnAModifyClose,
    } = useDisclosure();
    const [currentTitle, setCurrentTitle] = useState(itemQnA.title);
    const [currentContent, setCurrentContent] = useState(itemQnA.content);

    useEffect(() => {
      setCurrentTitle(itemQnA.title);
      setCurrentContent(itemQnA.content);
    }, [itemQnA]);
    return (
      <>
        <Td
          w={"70%"}
          onClick={() => {
            onQnAContentOpen();
            setIdQnA(itemQnA.id);
            setContentQnA(itemQnA.content);
            setTitleQnA(itemQnA.title);
          }}
        >
          {itemQnA.title}
        </Td>
        <Td w={"20%"}>
          {itemQnA.writer}

          {itemQnA.writer === Login.nickName && (
            <>
              <Popover>
                <PopoverTrigger>
                  <Badge colorScheme={"red"}>삭제</Badge>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverHeader fontWeight="semibold">
                    <Flex>
                      <Text>삭제 하시겠습니까?</Text>
                      <Badge onClick={() => handleQnADelete(itemQnA.id)}>
                        확인
                      </Badge>
                    </Flex>
                  </PopoverHeader>
                  <PopoverCloseButton />
                </PopoverContent>
              </Popover>

              <Popover
                isOpen={isQnAModifyOpen}
                onOpen={onQnAModifyOpen}
                onClose={onQnAModifyClose}
                closeOnBlur={false}
              >
                <PopoverTrigger>
                  <Badge variant="outline" colorScheme="green">
                    수정
                  </Badge>
                </PopoverTrigger>
                <PopoverContent>
                  <FocusLock returnFocus persistentFocus={true}>
                    <PopoverHeader fontWeight="semibold">
                      <Input
                        value={currentTitle}
                        onChange={(e) => setCurrentTitle(e.target.value)}
                      />
                    </PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody>
                      <FormControl>
                        <FormLabel>내용</FormLabel>
                        <Textarea
                          value={currentContent}
                          onChange={(e) => setCurrentContent(e.target.value)}
                        ></Textarea>
                      </FormControl>
                    </PopoverBody>
                    <PopoverFooter>
                      <Badge
                        variant="outline"
                        colorScheme="green"
                        onClick={() => {
                          handleQnAModify(
                            itemQnA.id,
                            currentTitle,
                            currentContent,
                          );
                          onQnAModifyClose();
                        }}
                      >
                        수정
                      </Badge>
                    </PopoverFooter>
                  </FocusLock>
                </PopoverContent>
              </Popover>
            </>
          )}
        </Td>
        <Td w={"10%"}>{itemQnA.regDate}</Td>
      </>
    );
  };

  const ListQnA = ({ listQnA }) => {
    return (
      <>
        {listQnA.map((itemQnA) => (
          <Tr key={itemQnA.id}>
            <QnAItem itemQnA={itemQnA} />
          </Tr>
        ))}
      </>
    );
  };

  const ProductCommentList = ({ commentList }) => {
    return (
      <Box>
        {commentList.map((commentItem) => (
          <CommentItem key={commentItem.id} commentItem={commentItem} />
        ))}
        <Box textAlign={"center"} mt={10}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((pageNumber) => (
            <Button
              onClick={() => {
                setPage(pageNumber);
              }}
              key={pageNumber}
            >
              {pageNumber}
            </Button>
          ))}
        </Box>
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

  function handleQnAAdd(id, title, content) {
    axios
      .post("/api/store/product/qna/add", {
        productId: id,
        writer: Login.nickName,
        title: title,
        content: content,
      })
      .then(() => {
        toast({
          status: "success",
          description: "작성 완료",
          position: "bottom",
        });
        listQnARefresh();
      })
      .catch(() => {})
      .finally(() => {
        onQnAClose();
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
                    <ListQnA listQnA={listQnA} />
                  </Tbody>
                </Table>
              </TableContainer>
              <Box w={"100%"} textAlign={"right"}>
                <Button onClick={onQnAOpen}>문의글 작성</Button>
              </Box>
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

      <Modal isOpen={isQnAOpen} onClose={onQnAClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>문의글 작성</ModalHeader>
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>제목</FormLabel>
              <Input
                type={"text"}
                placeholder={"제목을 작성해주세요"}
                onChange={(e) => setTitleQnA(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>내용</FormLabel>
              <Textarea
                resize={"none"}
                placeholder={"내용을 작성해주세요"}
                onChange={(e) => setContentQnA(e.target.value)}
              ></Textarea>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Flex>
              <Button
                onClick={() => handleQnAAdd(productId, titleQnA, contentQnA)}
              >
                확인
              </Button>
              <Button onClick={onQnAClose}>취소</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isQnAContentOpen} onClose={onQnAContentOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{titleQnA}</ModalHeader>
          <hr />
          <ModalBody>
            <FormControl>
              <FormLabel>내용</FormLabel>
              <Textarea onResize={"none"} readOnly>
                {contentQnA}
              </Textarea>
            </FormControl>
            <hr />
            <FormControl>
              <FormLabel>답변목록</FormLabel>
              <QnACommentAnswerList />
            </FormControl>
          </ModalBody>
          <hr />
          <ModalFooter>
            <Flex>
              <Button>확인</Button>
              <Button onClick={onQnAContentClose}>취소</Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

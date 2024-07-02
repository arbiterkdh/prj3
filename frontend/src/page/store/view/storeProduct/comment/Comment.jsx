import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import AddCommentModal from "./AddCommentModal.jsx";
import DeleteCommentModal from "./DeleteCommentModal.jsx";
import ModifyCommentModal from "./ModifyCommentModal.jsx";
import axios from "axios";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
  faWrench,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ColorButton from "../../../../../css/theme/component/button/ColorButton.jsx";

function Comment({ Login, productId, commentList, setCommentList }) {
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const [commentContent, setCommentContent] = useState("");
  const [commentId, setCommentId] = useState(0);

  const [isBuyer, setIsBuyer] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);

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
    commentListRefresh();
  }, [page]);
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
        setPageInfo(res.data.pageInfo);
      })
      .catch(() => {})
      .finally(() => {});
  };

  useEffect(() => {
    if (Login.id && productId) {
      axios
        .get(`/api/store/product/comment/isBuyer/${Login.id}/${productId}`)
        .then((res) => {
          if (res.data) {
            setIsBuyer(res.data);
            setIsDisabled(false);
          }
        })
        .catch(() => {})
        .finally(() => {});
    }
  }, [Login.id, productId]);

  const clicked = {
    variant: "solid",
    color: "white",
    bgColor: "#ff4357",
    _hover: {
      bgColor: "#ff7889",
    },
    _dark: {
      bgColor: "#ad303a",
      _hover: {
        bgColor: "#a86669",
      },
    },
  };

  const pageNumbers = [];
  for (let i = pageInfo.leftPageNumber; i <= pageInfo.rightPageNumber; i++) {
    pageNumbers.push(i);
  }

  const ProductCommentList = ({ commentList }) => {
    return (
      <Box>
        {commentList.length > 0 ? (
          <>
            {commentList.map((commentItem) => (
              <CommentItem key={commentItem.id} commentItem={commentItem} />
            ))}

            <Flex justifyContent={"center"} my={4}>
              {pageInfo.prevPageNumber && (
                <>
                  <Button onClick={() => setPage(1)}>
                    <FontAwesomeIcon icon={faAnglesLeft} />
                  </Button>
                  <Button onClick={() => setPage(pageInfo.prevPageNumber)}>
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
                      sx={
                        pageNumber === pageInfo.currentPageNumber ? clicked : {}
                      }
                    >
                      {pageNumber}
                    </Button>
                  ),
              )}

              {pageInfo.nextPageNumber && (
                <>
                  <Button onClick={() => setPage(pageInfo.nextPageNumber)}>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </Button>
                  <Button onClick={() => setPage(pageInfo.lastPageNumber)}>
                    <FontAwesomeIcon icon={faAnglesRight} />
                  </Button>
                </>
              )}
            </Flex>
          </>
        ) : (
          <Text>댓글이 없습니다</Text>
        )}
      </Box>
    );
  };

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
                  cursor={"pointer"}
                  variant="solid"
                  color={"white"}
                  bgColor={"red.500"}
                  _hover={{
                    bgColor: "red.600",
                  }}
                  _dark={{
                    bgColor: "red.700",
                    _hover: {
                      color: "whiteAlpha.900",
                      bgColor: "red.600",
                    },
                  }}
                >
                  <FontAwesomeIcon icon={faX} />
                </Badge>
                <Badge
                  onClick={() => {
                    onModifyOpen();
                    setCommentContent(commentItem.content);
                    setCommentId(commentItem.id);
                  }}
                  cursor={"pointer"}
                  bgColor={"dimgray"}
                  color={"white"}
                  _hover={{
                    bgColor: "gray",
                  }}
                >
                  <FontAwesomeIcon icon={faWrench} />
                </Badge>
              </>
            )}
          </Box>
          <Box w={"20%"}>{commentItem.regDate}</Box>
        </Flex>
      </Box>
    );
  };

  return (
    <>
      <ProductCommentList commentList={commentList} />
      <hr />
      <Text fontSize={"lg"}>한줄평</Text>
      <Flex w={"100%"}>
        <Box w={"70%"}>
          {isBuyer ? (
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
          ) : (
            <Box w={"100%"}>
              <FormControl>
                <Input
                  color="teal"
                  placeholder="구매후 작성해주세요"
                  _placeholder={{ opacity: 1, color: "gray.500" }}
                  readOnly
                />
              </FormControl>
            </Box>
          )}
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
            <ColorButton
              isDisabled={isDisabled}
              onClick={() => {
                setCommentContent(commentContent);
                onAddOpen();
              }}
            >
              확인
            </ColorButton>
          </Box>
        </Box>
      </Flex>

      <AddCommentModal
        isAddOpen={isAddOpen}
        onAddClose={onAddClose}
        productId={productId}
        commentContent={commentContent}
        Login={Login}
        commentListRefresh={commentListRefresh}
      />
      <DeleteCommentModal
        isDeleteOpen={isDeleteOpen}
        onDeleteClose={onDeleteClose}
        commentListRefresh={commentListRefresh}
        commentId={commentId}
      />
      <ModifyCommentModal
        isModifyOpen={isModifyOpen}
        onModifyClose={onModifyClose}
        commentListRefresh={commentListRefresh}
        commentId={commentId}
      />
    </>
  );
}

export default Comment;

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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Comment({ Login, productId, commentList, setCommentList }) {
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const [commentContent, setCommentContent] = useState("");
  const [commentId, setCommentId] = useState(0);

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

            <Box>
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
                  <Button onClick={() => setPage(pageInfo.nextPageNumber)}>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </Button>
                  <Button onClick={() => setPage(pageInfo.lastPageNumber)}>
                    <FontAwesomeIcon icon={faAnglesRight} />
                  </Button>
                </>
              )}
            </Box>
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
                  bgColor={"#e73426"}
                  color={"white"}
                >
                  삭제
                </Badge>
                <Badge
                  onClick={() => {
                    onModifyOpen();
                    setCommentContent(commentItem.content);
                    setCommentId(commentItem.id);
                  }}
                  cursor={"pointer"}
                  bgColor={"green.500"}
                  color={"white"}
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

  return (
    <>
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

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

function Comment({ commentList, Login, commentListRefresh, productId }) {
  const [page, setPage] = useState(1);
  const [commentContent, setCommentContent] = useState("");
  const [commentId, setCommentId] = useState(0);

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  useEffect(() => {
    commentListRefresh();
  }, [page]);

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
    </>
  );
}

export default Comment;

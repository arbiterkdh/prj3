import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import DeleteQnAModal from "./DeleteQnAModal.jsx";
import ModifyQnAModal from "./ModifyQnAModal.jsx";
import ReadQnAContentModal from "./ReadQnAContentModal.jsx";
import ColorButton from "../../../../../css/theme/component/button/ColorButton.jsx";

function QnA({
  productId,
  Login,
  listQnA,
  setListQnA,
  listQnARefresh,
  onQnAOpen,
  page,
  setPage,
  pageInfo,
  setPageInfo,
}) {
  const [titleQnA, setTitleQnA] = useState("");
  const [contentQnA, setContentQnA] = useState("");
  const [writerQnA, setWriterQnA] = useState("");

  const {
    isOpen: isQnAContentOpen,
    onOpen: onQnAContentOpen,
    onClose: onQnAContentClose,
  } = useDisclosure();

  useEffect(() => {
    listQnARefresh();
  }, [page]);

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

  const ListQnA = ({ listQnA }) => {
    return (
      <>
        {listQnA.length > 0 ? (
          <>
            {listQnA.map((itemQnA) => (
              <QnAItem itemQnA={itemQnA} key={itemQnA.id} />
            ))}
            <Tr>
              <Td colSpan={3}>
                <Flex justifyContent={"center"} my={4}>
                  {pageInfo.prevPageNumber > 0 && (
                    <>
                      <Button onClick={() => setPage(1)}>처음</Button>
                      <Button onClick={() => setPage(pageInfo.prevPageNumber)}>
                        이전
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
                            pageNumber === pageInfo.currentPage ? clicked : {}
                          }
                        >
                          {pageNumber}
                        </Button>
                      ),
                  )}
                  {pageInfo.nextPageNumber && (
                    <>
                      <Button onClick={() => setPage(pageInfo.nextPageNumber)}>
                        다음
                      </Button>
                      <Button onClick={() => setPage(pageInfo.lastPageNumber)}>
                        맨끝
                      </Button>
                    </>
                  )}
                </Flex>
              </Td>
            </Tr>
          </>
        ) : (
          <Tr>
            <Td colSpan={3}>
              <Text>댓글이 없습니다</Text>
            </Td>
          </Tr>
        )}
      </>
    );
  };

  const QnAItem = ({ itemQnA }) => {
    const {
      isOpen: isQnAModifyOpen,
      onOpen: onQnAModifyOpen,
      onClose: onQnAModifyClose,
    } = useDisclosure();

    return (
      <Tr>
        <Td
          w={"70%"}
          onClick={() => {
            onQnAContentOpen();
            setContentQnA(itemQnA.content);
            setTitleQnA(itemQnA.title);
            setWriterQnA(itemQnA.writer);
          }}
          style={{ cursor: "pointer" }}
        >
          {itemQnA.title}
        </Td>
        <Td w={"20%"}>
          {itemQnA.writer}
          {itemQnA.writer === Login.nickName && (
            <>
              <DeleteQnAModal
                itemQnAId={itemQnA.id}
                listQnARefresh={listQnARefresh}
              />
              <ModifyQnAModal
                isQnAModifyOpen={isQnAModifyOpen}
                onQnAModifyOpen={onQnAModifyOpen}
                onQnAModifyClose={onQnAModifyClose}
                itemQnATitle={itemQnA.title}
                itemQnAContent={itemQnA.content}
                itemQnAId={itemQnA.id}
                listQnARefresh={listQnARefresh}
              />
            </>
          )}
        </Td>
        <Td w={"10%"}>{itemQnA.regDate}</Td>
        <ReadQnAContentModal
          isQnAContentOpen={isQnAContentOpen}
          onQnAContentClose={onQnAContentClose}
          titleQnA={titleQnA}
          contentQnA={contentQnA}
          writerQnA={writerQnA}
          idQnA={itemQnA.id}
        />
      </Tr>
    );
  };

  return (
    <>
      <ListQnA listQnA={listQnA} />
      <Tr>
        <Td colSpan={3}>
          <Box w={"100%"}>
            <ColorButton onClick={onQnAOpen}>문의글 작성</ColorButton>
          </Box>
        </Td>
      </Tr>
    </>
  );
}

export default QnA;

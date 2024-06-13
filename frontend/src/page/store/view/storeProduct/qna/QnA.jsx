import React, { useEffect, useState } from "react";
import { Box, Button, Td, Tr, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import AddQnAModal from "./AddQnAModal.jsx";
import ReadQnAContentModal from "./ReadQnAContentModal.jsx";
import DeleteQnAModal from "./DeleteQnAModal.jsx";
import ModifyQnAModal from "./ModifyQnAModal.jsx";

function QnA({ productId, Login }) {
  const [listQnA, setListQnA] = useState([]);
  const [pageInfo, setPageInfo] = useState([]);
  const [idQnA, setIdQnA] = useState(0);
  const [titleQnA, setTitleQnA] = useState("");
  const [contentQnA, setContentQnA] = useState("");
  const [page, setPage] = useState(1);
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
      .get(`/api/store/product/qna/list/${productId}`, {
        params: {
          page,
        },
      })
      .then((res) => {
        setListQnA(res.data.listQnA);
        setPageInfo(res.data.pageInfo);
      })
      .catch(() => {})
      .finally(() => {});
  }, [page]);

  function listQnARefresh() {
    axios
      .get(`/api/store/product/qna/list/${productId}`)
      .then((res) => {
        setListQnA(res.data);
      })
      .catch(() => {})
      .finally(() => {});
  }

  const pageNumbers = [];

  for (let i = pageInfo.leftPageNumber; i <= pageInfo.rightPageNumber; i++) {
    pageNumbers.push(i);
  }

  const ListQnA = ({ listQnA }) => {
    return (
      <>
        {listQnA.map((itemQnA) => (
          <QnAItem itemQnA={itemQnA} key={itemQnA.id} />
        ))}

        <Tr>
          <Td>
            {pageInfo.prevPageNumber && (
              <>
                <Button onClick={() => setPage(1)}>처음</Button>
                <Button onClick={() => setPage(pageInfo.prevPageNumber)}>
                  이전
                </Button>
              </>
            )}
          </Td>
        </Tr>

        {pageNumbers.map((pageNumber) => (
          <Button
            onClick={() => setPage(pageNumber)}
            key={pageNumber}
            colorScheme={pageNumber === pageInfo.currentPage ? "blue" : "gray"}
          >
            {pageNumber}
          </Button>
        ))}

        {pageInfo.nextPageNumber && (
          <>
            <Button onClick={() => setPage(pageInfo.nextPageNumber)}>
              다음
            </Button>
            <Button onClick={() => setPage(pageInfo.rightPageNumber)}>
              맨끝
            </Button>
          </>
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
    const [currentTitle, setCurrentTitle] = useState(itemQnA.title);
    const [currentContent, setCurrentContent] = useState(itemQnA.content);

    useEffect(() => {
      setCurrentTitle(itemQnA.title);
      setCurrentContent(itemQnA.content);
    }, [itemQnA]);
    return (
      <>
        <Tr>
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
        </Tr>
      </>
    );
  };

  return (
    <>
      <Tr>
        <ListQnA listQnA={listQnA} />
      </Tr>

      <Tr>
        <Td>
          <Box w={"100%"}>
            <Button colorScheme={"blue"} onClick={onQnAOpen}>
              문의글 작성
            </Button>
          </Box>
        </Td>
      </Tr>

      <ReadQnAContentModal
        isQnAContentOpen={isQnAContentOpen}
        onQnAContentClose={onQnAContentClose}
        titleQnA={titleQnA}
        contentQnA={contentQnA}
      />

      <AddQnAModal
        isQnAOpen={isQnAOpen}
        onQnAClose={onQnAClose}
        productId={productId}
        listQnARefresh={listQnARefresh}
      />
    </>
  );
}

export default QnA;

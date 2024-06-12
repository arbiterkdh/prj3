import React, { useEffect, useState } from "react";
import { Box, Button, Td, Tr, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import AddQnAModal from "./AddQnAModal.jsx";
import ReadQnAContentModal from "./ReadQnAContentModal.jsx";
import DeleteQnAModal from "./DeleteQnAModal.jsx";
import ModifyQnAModal from "./ModifyQnAModal.jsx";

function QnA({ productId, Login }) {
  const [listQnA, setListQnA] = useState([]);
  const [idQnA, setIdQnA] = useState(0);
  const [titleQnA, setTitleQnA] = useState("");
  const [contentQnA, setContentQnA] = useState("");
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
      .get(`/api/store/product/qna/list/${productId}`)
      .then((res) => {
        setListQnA(res.data);
      })
      .catch(() => {})
      .finally(() => {});
  }, []);

  function listQnARefresh() {
    axios
      .get(`/api/store/product/qna/list/${productId}`)
      .then((res) => {
        setListQnA(res.data);
      })
      .catch(() => {})
      .finally(() => {});
  }

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
      </>
    );
  };

  return (
    <>
      <ListQnA listQnA={listQnA} />

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

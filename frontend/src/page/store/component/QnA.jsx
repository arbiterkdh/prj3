import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Td,
  Text,
  Textarea,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import FocusLock from "react-focus-lock";
import AddQnAModal from "../modal/qna/AddQnAModal.jsx";
import ReadQnAContentModal from "../modal/qna/ReadQnAContentModal.jsx";

function QnA({ productId, Login }) {
  const [listQnA, setListQnA] = useState([]);
  const [idQnA, setIdQnA] = useState(0);
  const [titleQnA, setTitleQnA] = useState("");
  const [contentQnA, setContentQnA] = useState("");
  const toast = useToast();
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

  return (
    <>
      <ListQnA listQnA={listQnA} />

      <Box w={"100%"}>
        <Button colorScheme={"blue"} onClick={onQnAOpen}>
          문의글 작성
        </Button>
      </Box>

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

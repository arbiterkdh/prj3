import {
  Badge,
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
  Textarea,
  useToast,
} from "@chakra-ui/react";
import FocusLock from "react-focus-lock";
import React, { useState } from "react";
import axios from "axios";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ModifyQnAModal({
  isQnAModifyOpen,
  onQnAModifyOpen,
  onQnAModifyClose,
  itemQnATitle,
  itemQnAContent,
  itemQnAId,
  listQnARefresh,
}) {
  const [currentTitle, setCurrentTitle] = useState(itemQnATitle);
  const [currentContent, setCurrentContent] = useState(itemQnAContent);
  const toast = useToast();

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
          position: "bottom-right",
        });
        listQnARefresh();
      })
      .catch(() => {})
      .finally(() => {});
  }

  return (
    <>
      <Popover
        isOpen={isQnAModifyOpen}
        onOpen={onQnAModifyOpen}
        onClose={onQnAModifyClose}
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Badge
            cursor={"pointer"}
            bgColor={"dimgray"}
            color={"white"}
            _hover={{
              bgColor: "gray",
            }}
          >
            <FontAwesomeIcon icon={faWrench} />
          </Badge>
        </PopoverTrigger>
        <PopoverContent _dark={{ bgColor: "#1F3032" }}>
          <FocusLock returnFocus persistentFocus={true}>
            <PopoverHeader fontWeight="semibold" mt={5}>
              <FormControl>
                <FormLabel>제목</FormLabel>
              </FormControl>
              <Input
                _dark={{ bgColor: "#1F3032" }}
                value={currentTitle}
                onChange={(e) => setCurrentTitle(e.target.value)}
              />
            </PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              <FormControl>
                <FormLabel>내용</FormLabel>
                <Textarea
                  _dark={{ bgColor: "#1F3032" }}
                  value={currentContent}
                  resize={"none"}
                  onChange={(e) => setCurrentContent(e.target.value)}
                ></Textarea>
              </FormControl>
            </PopoverBody>
            <PopoverFooter>
              <Badge
                p={1}
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
                cursor={"pointer"}
                onClick={() => {
                  handleQnAModify(itemQnAId, currentTitle, currentContent);
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
  );
}

export default ModifyQnAModal;

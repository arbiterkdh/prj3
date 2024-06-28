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
            variant="outline"
            bgColor={"green.500"}
            color={"white"}
            cursor={"pointer"}
          >
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

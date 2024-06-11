import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function PromoAdd() {
  const [title, setTitle] = useState("");
  const [eventType, setEventType] = useState([]);
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleAddEvent() {
    setLoading(true);
    axios
      .post("/api/promotion/add", {
        title,
        content,
        eventType,
        eventStartDate,
        eventEndDate,
        files,
      })
      .then((res) => {
        toast({
          status: "success",
          description: "새 글이 등록되었습니다.",
          position: "top",
        });
        navigate("/promotion");
      })
      .catch((e) => {
        const code = e.response.status;

        if (code === 400) {
          toast({
            status: "error",
            description: "등록되지 않았습니다. 입력한 내용을 확인하세요.",
            position: "top",
          });
        }
      })
      .finally(() => setLoading(false));
  }

  let disableSaveButton = false;
  if (title.trim().length === 0) {
    disableSaveButton = true;
  }
  if (content.trim().length === 0) {
    disableSaveButton = true;
  }
  if (!eventType) {
    disableSaveButton = true;
  }
  if (!eventStartDate) {
    disableSaveButton = true;
  }
  if (!eventEndDate) {
    disableSaveButton = true;
  }

  const fileNameList = [];
  for (let i = 0; i < files.length; i++) {
    fileNameList.push(<li>{files[i].name}</li>);
  }

  return (
    <Box>
      <Box>
        <FormControl>
          <FormLabel>이벤트 제목</FormLabel>
          <Input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요."
          />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>이벤트 타입</FormLabel>
          <Select
            onChange={(e) => setEventType(e.target.value)}
            placeholder="이벤트 타입을 선택하세요."
            value={eventType}
          >
            <option value="영화">영화</option>
            <option value="극장">극장</option>
            <option value="멤버십">멤버십</option>
            <option value="제휴/할인">제휴/할인</option>
          </Select>
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>시작일</FormLabel>
          <Input
            type={"date"}
            onChange={(e) => setEventStartDate(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>종료일</FormLabel>
          <Input
            type={"date"}
            onChange={(e) => setEventEndDate(e.target.value)}
          />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>사진파일</FormLabel>
          <Input
            multiple
            type="file"
            accept="image/*"
            onChange={(e) => setFiles(e.target.files)}
          />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>이벤트 설명</FormLabel>
          <Textarea
            onChange={(e) => setContent(e.target.value)}
            placeholder="설명을 입력하세요."
          />
        </FormControl>
        <Button
          colorScheme="teal"
          isLoading={loading}
          isDisabled={disableSaveButton}
          onClick={handleAddEvent}
        >
          저장
        </Button>
      </Box>
    </Box>
  );
}

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
  const [eventType, setEventType] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [content, setContent] = useState("");
  const [promoRecommendedFile, setPromoRecommendedFile] = useState([]);
  const [promoThumbnailFile, setPromoThumbnailFile] = useState([]);
  const [promoDetailFile, setPromoDetailFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleAddEvent = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("eventType", eventType);
      formData.append("eventStartDate", eventStartDate);
      formData.append("eventEndDate", eventEndDate);

      promoRecommendedFile.forEach((file) => {
        formData.append("promoRecommendedFile", file);
      });
      promoThumbnailFile.forEach((file) => {
        formData.append("promoThumbnailFile", file);
      });
      promoDetailFile.forEach((file) => {
        formData.append("promoDetailFile", file);
      });

      await axios.post("/api/promotion/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        status: "success",
        description: "새 글이 등록되었습니다.",
        position: "top",
      });
      navigate("/promotion");
    } catch (e) {
      if (e.response?.status === 400) {
        toast({
          status: "error",
          description: "등록되지 않았습니다. 입력한 내용을 확인하세요.",
          position: "top",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const disableSaveButton =
    !title.trim() ||
    !eventType ||
    !eventStartDate ||
    !eventEndDate ||
    promoThumbnailFile.length === 0 ||
    promoDetailFile.length === 0;

  return (
    <Box>
      <FormControl>
        <FormLabel>이벤트 제목</FormLabel>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요."
        />
      </FormControl>
      <FormControl>
        <FormLabel>이벤트 타입</FormLabel>
        <Select
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          placeholder="이벤트 타입을 선택하세요."
        >
          <option value="movie">영화</option>
          <option value="theater">극장</option>
          <option value="membership">멤버십</option>
          <option value="discount">제휴/할인</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>시작일</FormLabel>
        <Input
          type={"date"}
          value={eventStartDate}
          onChange={(e) => setEventStartDate(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>종료일</FormLabel>
        <Input
          type={"date"}
          value={eventEndDate}
          onChange={(e) => setEventEndDate(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>추천 이벤트 이미지 (추천 이벤트 요약 이미지)</FormLabel>
        <Input
          multiple
          type="file"
          accept="image/*"
          onChange={(e) => setPromoRecommendedFile(Array.from(e.target.files))}
        />
      </FormControl>
      <FormControl>
        <FormLabel>
          프로모션 목록 이미지 (프로모션 상세 내용을 보기 전의 요약 이미지)
        </FormLabel>
        <Input
          multiple
          type="file"
          accept="image/*"
          onChange={(e) => setPromoThumbnailFile(Array.from(e.target.files))}
        />
      </FormControl>
      <FormControl>
        <FormLabel>상세 프로모션 이미지 (프로모션 상세 내용 이미지)</FormLabel>
        <Input
          multiple
          type="file"
          accept="image/*"
          onChange={(e) => setPromoDetailFile(Array.from(e.target.files))}
        />
      </FormControl>
      <Box>
        <ul>
          {Array.from(promoRecommendedFile).map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
        <ul>
          {Array.from(promoThumbnailFile).map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
        <ul>
          {Array.from(promoDetailFile).map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </Box>
      <FormControl>
        <FormLabel>이벤트 설명</FormLabel>
        <Textarea
          value={content}
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
  );
}

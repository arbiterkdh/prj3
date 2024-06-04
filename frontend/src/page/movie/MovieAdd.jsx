import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import ko from "date-fns/locale/ko";
import "react-datepicker/dist/react-datepicker.css";

export function MovieAdd() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [runningTime, setRunningTime] = useState(0);
  const [rating, setRating] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [director, setDirector] = useState("");
  const [actors, setActors] = useState("");

  return (
    <Card>
      <CardHeader>영화 추가</CardHeader>

      <CardBody>
        <Stack>
          <Box>
            <FormControl>
              <FormLabel>제목</FormLabel>
              <Input onChange={(e) => setTitle(e.target.value)} />
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>이미지</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.value)}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>영화 설명</FormLabel>
              <Textarea onChange={(e) => setDescription(e.target.value)} />
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>장르</FormLabel>
              <Input
                placeholder=", 로 구분"
                onChange={(e) => setGenre(e.target.value)}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>상영시간</FormLabel>
              <Input
                type={"number"}
                placeholder={"분 단위로 입력"}
                onChange={(e) => setRunningTime(e.target.value)}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>관람등급</FormLabel>
              <Input
                type={"number"}
                placeholder={"예) 12세 이상이면 '12' 입력"}
                onChange={(e) => setRating(e.target.value)}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>개봉일</FormLabel>
              <DatePicker
                locale={ko}
                dateFormat="yyyy년 MM월 dd일"
                minDate={new Date()}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl>감독</FormControl>
            <Input onChange={(e) => setDirector(e.target.value)} />
          </Box>
          <Box>
            <FormControl>출연진</FormControl>
            <Input onChange={(e) => setActors(e.target.value)} />
          </Box>
          <Box>
            <Button>취소</Button>
            <Button colorScheme={"blue"}>저장</Button>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}

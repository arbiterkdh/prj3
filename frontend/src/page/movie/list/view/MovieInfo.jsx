import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";
import CenterBox from "../../../../css/theme/component/box/CenterBox.jsx";

export function MovieInfo({ movie }) {
  if (Object.entries(movie).length === 0) {
    return null;
  }

  function handleRemoveClick() {}

  let index = 0;

  function ShowType(type, index) {
    let str;
    str = type;
    if (index < movie.type.length - 1) {
      str = str + ", ";
    }
    return (
      <Text mr={1} key={index}>
        {str}
      </Text>
    );
  }

  return (
    <Center>
      <CenterBox>
        <Stack>
          <Box>
            <p style={{ whiteSpace: "pre-wrap", marginBottom: "50px" }}>
              {movie.content}
            </p>
          </Box>
          <Divider />
          <Box>
            <Flex>
              <Text mr={2}>상영타입 : </Text>
              {movie.type.map((type, index) => ShowType(type, index))}
            </Flex>
          </Box>
          <Box>
            <Flex gap={2} height={"20px"}>
              <Text>감독 : {movie.director}</Text>
              <Divider orientation="vertical" />
              <Text>
                장르 : {movie.genre} / {movie.runningTime} 분
              </Text>
              <Divider orientation="vertical" />
              <Text> 등급 : {movie.rating}세이상관람가 </Text>
              <Divider orientation="vertical" />
              <Text> 개봉일 : {movie.startDate}</Text>
            </Flex>
          </Box>
          <Box>
            <Text> 출연진 : {movie.actors}</Text>
          </Box>
        </Stack>
        <Flex justifyContent={"flex-end"}>
          <Button colorScheme={"blue"}>수정</Button>
          <Button onClick={handleRemoveClick} colorScheme={"red"}>
            삭제
          </Button>
        </Flex>
      </CenterBox>
    </Center>
  );
}

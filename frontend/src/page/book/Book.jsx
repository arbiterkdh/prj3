import { Box, Center, Flex, Heading, Select, Stack } from "@chakra-ui/react";
import CenterBox from "../../css/theme/component/box/CenterBox.jsx";
import BookStack from "../../css/theme/component/stack/BookStack.jsx";
import BookBox from "../../css/theme/component/box/BookBox.jsx";
import OuterBookBox from "../../css/theme/component/box/OuterBookBox.jsx";
import OuterBookStack from "../../css/theme/component/stack/OuterBookStack.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { BookMovieLocationAdd } from "./add/BookMovieLocationAdd.jsx";
import { BookTheaterList } from "./list/BookTheaterList.jsx";

export function Book() {
  const [cityList, setCityList] = useState([]);
  const [theaterList, setTheaterList] = useState([]);
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    axios
      .get(`/api/theater`)
      .then((res) => {
        setCityList(res.data);
      })
      .catch()
      .finally();
  }, []);

  return (
    <Center>
      <CenterBox>
        <Heading>빠른예매</Heading>
        <Flex border={"1px solid black"}>
          <BookStack h={"700px"} gap={0}>
            <OuterBookStack>
              <Box>01</Box>
              <Box>상영시간</Box>
            </OuterBookStack>
            <OuterBookStack>
              <Box>02</Box>
              <Box>인원/좌석</Box>
            </OuterBookStack>
            <OuterBookStack>
              <Box>03</Box>
              <Box>결제</Box>
            </OuterBookStack>
            <OuterBookStack>
              <Box>04</Box>
              <Box>결제완료</Box>
            </OuterBookStack>
          </BookStack>
          <Stack w={"100%"} h={"500px"}>
            <Flex>
              <OuterBookBox>
                <BookBox>영화지점명</BookBox>
                <BookBox></BookBox>
                <BookTheaterList
                  cityList={cityList}
                  theaterList={theaterList}
                />
              </OuterBookBox>
              <OuterBookBox>
                <BookBox>영화 선택</BookBox>
                <BookBox>
                  <Select>
                    <option>예매순</option>
                    <option>관객순</option>
                    <option>예정작</option>
                  </Select>
                </BookBox>
                <Box h={"600px"} border={"1px solid black"}>
                  영화들 쭉 나열할 곳<Box></Box>
                </Box>
              </OuterBookBox>
              <OuterBookBox>
                <BookBox>날짜 나올 곳</BookBox>
                <BookBox>날짜 페이징 할 곳</BookBox>
                <Box h={"600px"} border={"1px solid black"}>
                  해당되는 영화들 쭉 나열될 곳
                </Box>
              </OuterBookBox>
            </Flex>
            <Box></Box>
          </Stack>
        </Flex>
        <BookMovieLocationAdd />
      </CenterBox>
    </Center>
  );
}

import CenterBox from "../../css/theme/component/box/CenterBox.jsx";
import { Box, Center, Flex, Heading } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import BookStack from "../../css/theme/component/stack/BookStack.jsx";
import OuterBookStack from "../../css/theme/component/stack/OuterBookStack.jsx";
import { BookMovieLocationAdd } from "./manage/BookMovieLocationAdd.jsx";
import { useState } from "react";
import LargeFontBox from "../../css/theme/component/box/LargeFontBox.jsx";
import { BookMovieAddInTheaterBox } from "./manage/BookMovieAddInTheaterBox.jsx";

export function BookHome() {
  const [bookProgress, setBookProgress] = useState(1);

  const [cityList, setCityList] = useState([]);
  const [theaterNumberList, setTheaterNumberList] = useState([]);

  const [movieList, setMovieList] = useState([]);
  const [onScreenList, setOnScreenList] = useState([]);
  const [willScreenList, setWillScreenList] = useState([]);

  const [theaterBoxList, setTheaterBoxList] = useState([]);

  const [movieLocationAdd, setMovieLocationAdd] = useState([]);

  return (
    <Center>
      <CenterBox>
        <Heading>빠른예매</Heading>
        <Flex border={"2px solid"}>
          <BookStack h={"700px"} gap={0}>
            <OuterBookStack
              bgColor={bookProgress === 1 ? "red.500" : ""}
              _dark={bookProgress === 1 ? { bgColor: "red.700" } : {}}
              color={bookProgress === 1 ? "whiteAlpha.900" : ""}
              border={bookProgress === 1 ? "none" : ""}
            >
              <LargeFontBox>01</LargeFontBox>
              <Box>상영시간</Box>
            </OuterBookStack>
            <OuterBookStack
              bgColor={bookProgress === 2 ? "red.500" : ""}
              _dark={bookProgress === 2 ? { bgColor: "red.700" } : {}}
              color={bookProgress === 2 ? "whiteAlpha.900" : ""}
              border={bookProgress === 2 ? "none" : ""}
            >
              <LargeFontBox>02</LargeFontBox>
              <Box>인원/좌석</Box>
            </OuterBookStack>
            <OuterBookStack
              bgColor={bookProgress === 3 ? "red.500" : ""}
              _dark={bookProgress === 3 ? { bgColor: "red.700" } : {}}
              color={bookProgress === 3 ? "whiteAlpha.900" : ""}
              border={bookProgress === 3 ? "none" : ""}
            >
              <LargeFontBox>03</LargeFontBox>
              <Box>결제</Box>
            </OuterBookStack>
            <OuterBookStack
              borderBottom={"none"}
              bgColor={bookProgress === 4 ? "red.500" : ""}
              _dark={bookProgress === 4 ? { bgColor: "red.700" } : {}}
              color={bookProgress === 4 ? "whiteAlpha.900" : ""}
              border={bookProgress === 4 ? "none" : ""}
            >
              <LargeFontBox>04</LargeFontBox>
              <Box>결제완료</Box>
            </OuterBookStack>
          </BookStack>
          <Outlet
            context={{
              cityList,
              setCityList,
              theaterNumberList,
              setTheaterNumberList,
              movieList,
              setMovieList,
              onScreenList,
              theaterBoxList,
              setTheaterBoxList,
              setOnScreenList,
              willScreenList,
              setWillScreenList,
              movieLocationAdd,
              setBookProgress,
            }}
          />
        </Flex>
        {bookProgress === 1 && (
          <Box>
            <BookMovieLocationAdd
              cityList={cityList}
              setMovieLocationAdd={setMovieLocationAdd}
              movieList={movieList}
              setMovieList={setMovieList}
              onScreenList={onScreenList}
              willScreenList={willScreenList}
            />
            <BookMovieAddInTheaterBox
              cityList={cityList}
              onScreenList={onScreenList}
              willScreenList={willScreenList}
            />
          </Box>
        )}
      </CenterBox>
    </Center>
  );
}

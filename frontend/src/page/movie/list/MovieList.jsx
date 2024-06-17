import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Spacer,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import CenterBox from "../../../css/theme/component/box/CenterBox.jsx";
import {
  faAngleDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function MovieList() {
  const [movieList, setMovieList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    axios.get(`/api/movie/list?${searchParams}`).then((res) => {
      setMovieList(res.data.movieList);
      setPageInfo(res.data.pageInfo);
    });

    setSearchKeyword("");

    const pageParam = parseInt(searchParams.get("page"));
    const tabParam = parseInt(searchParams.get("tab"));
    const keyword = searchParams.get("keyword");

    if (pageParam) {
      setPage(pageParam);
    }
    if (tabParam) {
      setTab(tabParam);
    }
    if (keyword) {
      setSearchKeyword(keyword);
    }
  }, [searchParams]);

  function handleAddClick() {
    navigate("/movie/add");
  }

  function handleImageClick(movieId) {
    navigate(`/movie/view/${movieId}`);
  }

  function handlePageClick() {
    searchParams.set("page", page + 1);
    searchParams.set("tab", tab);
    searchParams.set("keyword", searchKeyword);
    navigate(`/movie?${searchParams}`);
  }

  function handleSearchClick() {
    navigate(`/movie?page=1&tab=${tab}&keyword=${searchKeyword}`);
  }

  function handleNowShowingMovieTab() {
    navigate(`/movie?page=1&tab=1`);
  }

  function handleComingSoonMovieTab() {
    navigate(`/movie?page=1&tab=2`);
  }

  return (
    <Center>
      <CenterBox mb={10}>
        <Box mt={"-50px"} mb={10} ml={"930px"}>
          <Button colorScheme={"blue"} onClick={handleAddClick}>
            추가
          </Button>
        </Box>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab onClick={handleNowShowingMovieTab}>현재상영작</Tab>
            <Tab onClick={handleComingSoonMovieTab}>상영예정작</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {/* 검색 창*/}
              <Flex>
                <Spacer />
                <InputGroup mb={5} w={"300px"} size="md">
                  <Input
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="영화명 검색"
                  />
                  <InputRightElement width="4.5rem">
                    <Button onClick={handleSearchClick} h="1.75rem" size="md">
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Flex>
              {/* 현재 상영작 */}
              <SimpleGrid spacing={4} templateColumns="repeat(4, 1fr)">
                {movieList.map((movie) => (
                  <Card key={movie.id} maxW="sm" mb={"30px"}>
                    <CardBody>
                      <Center>
                        <Image
                          h={"250px"}
                          cursor={"pointer"}
                          onClick={() => handleImageClick(movie.id)}
                          src={movie.movieImageFile}
                          borderRadius="lg"
                        />
                      </Center>
                      <Stack mt="6" spacing="3">
                        <Heading size="md">{movie.title}</Heading>
                        <Text mt={-6}>개봉일 {movie.startDate}</Text>
                      </Stack>
                    </CardBody>
                    <Center>
                      <CardFooter mt={-6}>
                        <ButtonGroup spacing="2">
                          <Button variant="outline" colorScheme="purple">
                            하트
                          </Button>
                          <Button variant="solid" colorScheme="purple">
                            예매
                          </Button>
                        </ButtonGroup>
                      </CardFooter>
                    </Center>
                  </Card>
                ))}
              </SimpleGrid>
              {page !== pageInfo.lastPageNumber && (
                <Button
                  rightIcon={<FontAwesomeIcon icon={faAngleDown} />}
                  w={"100%"}
                  onClick={handlePageClick}
                >
                  더보기
                </Button>
              )}
            </TabPanel>
            <TabPanel>
              {/* 검색 창*/}
              <Flex>
                <Spacer />
                <InputGroup mb={5} w={"300px"} size="md">
                  <Input
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="영화명 검색"
                  />
                  <InputRightElement width="4.5rem">
                    <Button onClick={handleSearchClick} h="1.75rem" size="md">
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Flex>
              {/* 상영 예정작 */}
              <SimpleGrid spacing={4} templateColumns="repeat(4, 1fr)">
                {movieList.map((movie) => (
                  <Card key={movie.id} maxW="sm" mb={"30px"}>
                    <CardBody>
                      <Center>
                        <Image
                          h={"250px"}
                          cursor={"pointer"}
                          onClick={() => handleImageClick(movie.id)}
                          src={movie.movieImageFile}
                          borderRadius="lg"
                        />
                      </Center>
                      <Stack mt="6" spacing="3">
                        <Heading size="md">{movie.title}</Heading>
                        <Text mt={-6}>개봉일 {movie.startDate}</Text>
                      </Stack>
                    </CardBody>
                    <Center>
                      <CardFooter mt={-6}>
                        <ButtonGroup spacing="2">
                          <Button variant="outline" colorScheme="purple">
                            하트
                          </Button>
                          <Button variant="solid" colorScheme="purple">
                            예매
                          </Button>
                        </ButtonGroup>
                      </CardFooter>
                    </Center>
                  </Card>
                ))}
              </SimpleGrid>
              {page !== pageInfo.lastPageNumber && (
                <Button
                  rightIcon={<FontAwesomeIcon icon={faAngleDown} />}
                  w={"100%"}
                  onClick={handlePageClick}
                >
                  더보기
                </Button>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </CenterBox>
    </Center>
  );
}

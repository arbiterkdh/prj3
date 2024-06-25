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
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import CenterBox from "../../../css/theme/component/box/CenterBox.jsx";
import {
  faAngleDown,
  faHeart as fullHeart,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { LoginContext } from "../../../component/LoginProvider.jsx";
import HeartButton from "../../../css/theme/component/button/HeartButton.jsx";
import TicketingButton from "../../../css/theme/component/button/TicketingButton.jsx";

export function MovieList() {
  const [movieList, setMovieList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLikeProcessing, setIsLikeProcessing] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const toast = useToast();
  const account = useContext(LoginContext);

  useEffect(() => {
    if (!isLikeProcessing) {
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
    }
  }, [searchParams, isLikeProcessing]);

  function handleLikeClick(movieId) {
    setIsLikeProcessing(true);
    axios
      .put("/api/movie/like", {
        movieId: movieId,
      })
      .catch(() => {
        toast({
          status: "error",
          description: "로그인을 해주세요",
          position: "bottom-right",
        });
      })
      .finally(() => setIsLikeProcessing(false));
  }

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
        {account.isAdmin() && (
          <Box mt={"-50px"} mb={10} ml={"930px"}>
            <Button colorScheme={"blue"} onClick={handleAddClick}>
              추가
            </Button>
          </Box>
        )}
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em" borderBottom={"none"}>
            <Tab
              borderBottom={"1px solid lightgray"}
              _selected={{
                border: "1px solid lightgray",
                borderBottom: "1px solid #FEFEFE",
              }}
              _dark={{
                _selected: {
                  color: "white",
                  border: "1px solid lightgray",
                  borderBottom: "1px solid #1F3032",
                },
              }}
              onClick={handleNowShowingMovieTab}
            >
              현재상영작
            </Tab>
            <Tab
              borderBottom={"1px solid #e8eaed"}
              _selected={{
                border: "1px solid #e8eaed",
                borderBottom: "1px solid #FEFEFE",
              }}
              _dark={{
                _selected: {
                  color: "white",
                  border: "1px solid lightgray",
                  borderBottom: "1px solid #1F3032",
                },
              }}
              onClick={handleComingSoonMovieTab}
            >
              상영예정작
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {/* 검색 창*/}
              <Flex>
                <Spacer />
                <InputGroup mb={5} w={"300px"} size="md">
                  <Input
                    border={"3px solid #FF4357"}
                    borderRadius={"20px"}
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="영화명 검색"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      bgColor={"white"}
                      _hover={{
                        bgColor: "white",
                      }}
                      _dark={{
                        color: "lightgray",
                        bgColor: "#121212",
                        _hover: {
                          bgColor: "#121212",
                        },
                      }}
                      onClick={handleSearchClick}
                      h="1.75rem"
                      size="md"
                    >
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Flex>
              {/* 현재 상영작 */}
              <SimpleGrid spacing={4} templateColumns="repeat(4, 1fr)">
                {movieList.map((movie) => (
                  <Card
                    borderRadius={"0px"}
                    _dark={{ bgColor: "#2d4c4c" }}
                    key={movie.id}
                    maxW="sm"
                    mb={"30px"}
                  >
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
                        <Heading lineHeight={1} noOfLines={1} size="md">
                          {movie.title}
                        </Heading>
                        <Text mt={-6}>개봉일 {movie.startDate}</Text>
                      </Stack>
                    </CardBody>
                    <Center>
                      <CardFooter mt={-6}>
                        <ButtonGroup spacing="2">
                          <HeartButton
                            w={"100px"}
                            leftIcon={
                              movie.movieHeart.like ? (
                                <FontAwesomeIcon icon={fullHeart} />
                              ) : (
                                <FontAwesomeIcon icon={emptyHeart} />
                              )
                            }
                            onClick={() => handleLikeClick(movie.id)}
                          >
                            {movie.movieHeart.count}
                          </HeartButton>
                          <TicketingButton w={"100px"}>예매</TicketingButton>
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
                    border={"3px solid #FF4357"}
                    borderRadius={"20px"}
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="영화명 검색"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      bgColor={"white"}
                      _hover={{
                        bgColor: "white",
                      }}
                      _dark={{
                        color: "lightgray",
                        bgColor: "#121212",
                        _hover: {
                          bgColor: "#121212",
                        },
                      }}
                      onClick={handleSearchClick}
                      h="1.75rem"
                      size="md"
                    >
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Flex>
              {/* 상영 예정작 */}
              <SimpleGrid spacing={4} templateColumns="repeat(4, 1fr)">
                {movieList.map((movie) => (
                  <Card
                    borderRadius={"0px"}
                    _dark={{ bgColor: "#2d4c4c" }}
                    key={movie.id}
                    maxW="sm"
                    mb={"30px"}
                  >
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
                        <Heading lineHeight={1} noOfLines={1} size="md">
                          {movie.title}
                        </Heading>
                        <Text mt={-6}>개봉일 {movie.startDate}</Text>
                      </Stack>
                    </CardBody>
                    <Center>
                      <CardFooter mt={-6}>
                        <ButtonGroup spacing="2">
                          <HeartButton
                            w={"100px"}
                            leftIcon={
                              movie.movieHeart.like ? (
                                <FontAwesomeIcon icon={fullHeart} />
                              ) : (
                                <FontAwesomeIcon icon={emptyHeart} />
                              )
                            }
                            onClick={() => handleLikeClick(movie.id)}
                          >
                            {movie.movieHeart.count}
                          </HeartButton>
                          <TicketingButton w={"100px"}>예매</TicketingButton>
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

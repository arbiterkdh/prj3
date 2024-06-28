import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CenterBox from "../../../../css/theme/component/box/CenterBox.jsx";
import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Spacer,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import { MovieInfo } from "./MovieInfo.jsx";
import { MovieComment } from "./comment/MovieComment.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import HeartButton from "../../../../css/theme/component/button/HeartButton.jsx";
import ColorButton from "../../../../css/theme/component/button/ColorButton.jsx";

export function MovieView() {
  const { id } = useParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [movie, setMovie] = useState(null);
  const [like, setLike] = useState({
    like: false,
    count: 0,
  });
  const toast = useToast();
  const [posterUrl, setPosterUrl] = useState("");

  const kmdbKey = import.meta.env.VITE_KMDb_APP_KEY;
  const kmdbUrl =
    "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y";

  useEffect(() => {
    axios
      .get(`/api/movie/${id}`)
      .then((res) => {
        setMovie(res.data.movie);
        setLike(res.data.like);
        axios
          .get(
            `${kmdbUrl}&movieId=${res.data.movie.alphabet}&movieSeq=${res.data.movie.number}&ServiceKey=${kmdbKey}`,
          )
          .then((res) => {
            let posterLength =
              res.data.Data[0].Result[0].posters.split("|").length;
            setPosterUrl(
              res.data.Data[0].Result[0].posters.split("|")[
                Math.floor(Math.random() * posterLength)
              ],
            );
          });
      })
      .catch(() => {})
      .finally(() => {});
  }, []);

  function handleLikeClick() {
    axios
      .put("/api/movie/like", {
        movieId: id,
      })
      .then((res) => setLike(res.data))
      .catch(() =>
        toast({
          status: "error",
          description: "로그인을 해주세요",
          position: "bottom-right",
        }),
      );
  }

  if (movie === null) {
    return <Spinner />;
  }

  return (
    <Center>
      <CenterBox>
        <Stack>
          <Flex h={"450px"} position="relative" mb={"20px"}>
            <Box
              position="absolute"
              top="0"
              right="0"
              bottom="0"
              left="0"
              backgroundImage={`url(${posterUrl})`}
              backgroundRepeat="no-repeat"
              backgroundPosition="center top"
              backgroundSize="60%"
              zIndex="1"
            />
            <Box
              background={
                "linear-gradient(to right, #0f0f0f 20%, rgba(15, 15, 15, 0) 50%, #0f0f0f 80%)"
              }
              position="absolute"
              top="0"
              right="0"
              bottom="0"
              left="0"
              zIndex="2"
            />
            <Stack justify={"space-between"}>
              <Heading
                p={10}
                zIndex={"10"}
                mt={"20px"}
                fontSize={"5xl"}
                textAlign={"center"}
                color={"white"}
              >
                {movie.title}
              </Heading>
              <Box p={10}>
                <HeartButton
                  border={"3px solid"}
                  _hover={{
                    bgColor: "whiteAlpha.900",
                  }}
                  zIndex={"10"}
                  leftIcon={
                    like.like ? (
                      <FontAwesomeIcon icon={fullHeart} />
                    ) : (
                      <FontAwesomeIcon icon={emptyHeart} />
                    )
                  }
                  onClick={handleLikeClick}
                  w={"200px"}
                >
                  {like.count}
                </HeartButton>
                <ColorButton zIndex={"10"} w={"200px"}>
                  예매
                </ColorButton>
              </Box>
            </Stack>
            <Spacer />
            <Box p={12}>
              <Center>
                <Image
                  border={"1px solid"}
                  color={"whiteAlpha.500"}
                  zIndex={"10"}
                  mb={"-30px"}
                  w={"250px"}
                  src={movie.movieImageFile}
                />
              </Center>
            </Box>
          </Flex>
          <Box>
            <Tabs isFitted variant={"enclosed"}>
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
                >
                  주요정보
                </Tab>
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
                >
                  실관람평
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <MovieInfo
                    movie={movie}
                    isProcessing={isProcessing}
                    setIsProcessing={setIsProcessing}
                  />
                </TabPanel>
                <TabPanel mt={"-30px"}>
                  <MovieComment
                    movieId={id}
                    isProcessing={isProcessing}
                    setIsProcessing={setIsProcessing}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Stack>
      </CenterBox>
    </Center>
  );
}

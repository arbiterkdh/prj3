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
import TicketingButton from "../../../../css/theme/component/button/TicketingButton.jsx";

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
          .then((res) => setPosterUrl(res.data.Data[0].Result[0].posters));
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
          <Flex position="relative" mb={"20px"} overflow={"hidden"}>
            <Box
              position="absolute"
              top="0"
              right="0"
              bottom="0"
              left="0"
              //     style={{
              //       backgroundImage: `linear-gradient(
              //     to right,
              //      rgba(0, 0, 0, 1.0) 0%,
              //      rgba(0, 0, 0, 0.8) 10%,
              //      rgba(0, 0, 0, 0.6) 20%,
              //      rgba(0, 0, 0, 0.4) 30%,
              //      rgba(0, 0, 0, 0.2) 40%,
              //      rgba(0, 0, 0, 0) 50%,
              //      rgba(0, 0, 0, 0.2) 60%,
              //      rgba(0, 0, 0, 0.4) 70%,
              //      rgba(0, 0, 0, 0.6) 80%,
              //      rgba(0, 0, 0, 0.8) 90%,
              //      rgba(0, 0, 0, 1.0) 100%,
              // ), url(${posterUrl})`,
              //     }}
              //     backgroundImage={`linear-gradient(
              //     to right,
              //      rgba(0, 0, 0, 1.0) 0%,
              //      rgba(0, 0, 0, 0.8) 10%,
              //      rgba(0, 0, 0, 0.6) 20%,
              //      rgba(0, 0, 0, 0.4) 30%,
              //      rgba(0, 0, 0, 0.2) 40%,
              //      rgba(0, 0, 0, 0) 50%,
              //      rgba(0, 0, 0, 0.2) 60%,
              //      rgba(0, 0, 0, 0.4) 70%,
              //      rgba(0, 0, 0, 0.6) 80%,
              //      rgba(0, 0, 0, 0.8) 90%,
              //      rgba(0, 0, 0, 1.0) 100%,
              // ), url(${posterUrl})`}
              backgroundRepeat="no-repeat"
              backgroundPosition="center"
              backgroundSize="70%"
              zIndex="1"
            ></Box>
            <Stack justify={"space-between"}>
              <Heading
                zIndex={"10"}
                mt={"20px"}
                fontSize={"5xl"}
                textAlign={"center"}
              >
                {movie.title}
              </Heading>
              <Box>
                <HeartButton
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
                <TicketingButton zIndex={"10"} w={"200px"}>
                  예매
                </TicketingButton>
              </Box>
            </Stack>
            <Spacer />
            <Box mb={10}>
              <Center>
                <Image
                  zIndex={"10"}
                  mb={"-30px"}
                  w={"300px"}
                  src={movie.movieImageFile}
                />
                {/*movie.movieImageFile*/}
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

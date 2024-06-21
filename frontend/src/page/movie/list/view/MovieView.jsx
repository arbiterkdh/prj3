import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CenterBox from "../../../../css/theme/component/box/CenterBox.jsx";
import {
  Box,
  Button,
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

export function MovieView() {
  const { id } = useParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [movie, setMovie] = useState(null);
  const [like, setLike] = useState({
    like: false,
    count: 0,
  });
  const toast = useToast();

  useEffect(() => {
    axios
      .get(`/api/movie/${id}`)
      .then((res) => {
        setMovie(res.data.movie);
        setLike(res.data.like);
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
          <Flex>
            <Stack justify={"space-between"}>
              <Heading mt={"20px"} fontSize={"5xl"} textAlign={"center"}>
                {movie.title}
              </Heading>
              <Box>
                <Button
                  leftIcon={
                    like.like ? (
                      <FontAwesomeIcon icon={fullHeart} />
                    ) : (
                      <FontAwesomeIcon icon={emptyHeart} />
                    )
                  }
                  onClick={handleLikeClick}
                  variant={"outline"}
                  colorScheme={"purple"}
                  w={"200px"}
                >
                  {like.count}
                </Button>
                <Button variant={"solid"} colorScheme={"purple"} w={"200px"}>
                  예매
                </Button>
              </Box>
            </Stack>
            <Spacer />
            <Box mb={10}>
              <Center>
                <Image mb={"-30px"} w={"300px"} src={movie.movieImageFile} />
              </Center>
            </Box>
          </Flex>
          <Box>
            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab>주요정보</Tab>
                <Tab>실관람평</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <MovieInfo
                    movie={movie}
                    isProcessing={isProcessing}
                    setIsProcessing={setIsProcessing}
                  />
                </TabPanel>
                <TabPanel>
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

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CenterBox from "../../../../css/theme/component/box/CenterBox.jsx";
import {
  Box,
  Center,
  Heading,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { MovieInfo } from "./MovieInfo.jsx";
import { MovieComment } from "./comment/MovieComment.jsx";

export function MovieView() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    axios
      .get(`/api/movie/${id}`)
      .then((res) => setMovie(res.data))
      .catch(() => {})
      .finally(() => {});
  }, []);

  return (
    <Center>
      <CenterBox>
        <Stack>
          <Box>
            <Box>
              <Heading textAlign={"center"}>{movie.title}</Heading>
            </Box>
            <Box mb={10}>
              <Text textAlign={"center"}> 이미지 </Text>
            </Box>
          </Box>
          <Box>
            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab>주요정보</Tab>
                <Tab>실관람평</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <MovieInfo movie={movie} />
                </TabPanel>
                <TabPanel>
                  <MovieComment />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Stack>
      </CenterBox>
    </Center>
  );
}

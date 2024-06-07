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

export function MovieView() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    axios
      .get(`/api/movie/view/${id}`)
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
                  {/*<MovieComment /> todo: 영화 댓글기능 추가 필요 */}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Stack>
      </CenterBox>
    </Center>
  );
}

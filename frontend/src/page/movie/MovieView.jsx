import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CenterBox from "../../css/theme/component/box/CenterBox.jsx";
import { Box, Center, Heading, Stack, Text } from "@chakra-ui/react";

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
        <Center>
          <Stack>
            <Box>
              <Heading>{movie.title}</Heading>
            </Box>
            <Box>
              <Text> 이미지 </Text>
            </Box>
            <Box></Box>
          </Stack>
        </Center>
      </CenterBox>
    </Center>
  );
}

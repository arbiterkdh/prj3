import { Box, Center, Heading } from "@chakra-ui/react";
import CenterBox from "../../../../../css/theme/component/box/CenterBox.jsx";
import { MovieCommentWrite } from "./MovieCommentWrite.jsx";
import { MovieCommentList } from "./MovieCommentList.jsx";

export function MovieComment({ movieId }) {
  return (
    <Center>
      <CenterBox>
        <Heading>댓글기능</Heading>
        <Box>
          <MovieCommentWrite movieId={movieId} />
        </Box>
        <Box>
          <MovieCommentList />
        </Box>
      </CenterBox>
    </Center>
  );
}

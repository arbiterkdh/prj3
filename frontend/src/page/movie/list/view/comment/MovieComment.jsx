import { Box, Center, Heading } from "@chakra-ui/react";
import CenterBox from "../../../../../css/theme/component/box/CenterBox.jsx";
import { MovieCommentWrite } from "./MovieCommentWrite.jsx";
import { MovieCommentList } from "./MovieCommentList.jsx";

export function MovieComment({ movieId, isProcessing, setIsProcessing }) {
  return (
    <Center>
      <CenterBox>
        <Heading>댓글기능</Heading>
        <Box>
          <MovieCommentWrite
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
            movieId={movieId}
          />
        </Box>
        <Box>
          <MovieCommentList
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
            movieId={movieId}
          />
        </Box>
      </CenterBox>
    </Center>
  );
}

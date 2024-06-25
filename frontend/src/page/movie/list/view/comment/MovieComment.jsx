import { Box, Center, Heading } from "@chakra-ui/react";
import { MovieCommentWrite } from "./MovieCommentWrite.jsx";
import { MovieCommentList } from "./MovieCommentList.jsx";

export function MovieComment({ movieId, isProcessing, setIsProcessing }) {
  return (
    <Center>
      <Box w={"100%"}>
        <Heading>실관람평</Heading>
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
      </Box>
    </Center>
  );
}

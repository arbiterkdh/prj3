import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MovieList() {
  const [movieList, setMovieList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/movie/list")
      .then((res) => {
        setMovieList(res.data);
      })
      .catch(() => {})
      .finally(() => {});
  }, []);

  function handleAddClick() {
    navigate("/movie/add");
  }

  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
    >
      {movieList.map((movie) => (
        <Card maxW="sm">
          <CardBody>
            <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt="Green double couch with wooden legs"
              borderRadius="lg"
            />
            <Stack mt="6" spacing="3">
              <Heading size="md">{movie.title}</Heading>
              <Text>개봉일 {movie.startDate}</Text>
            </Stack>
          </CardBody>
          <CardFooter>
            <ButtonGroup spacing="2">
              <Button variant="ghost" colorScheme="purple">
                하트
              </Button>
              <Button variant="solid" colorScheme="purple">
                예매
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      ))}
      <Box>
        <Button colorScheme={"blue"} onClick={handleAddClick}>
          추가
        </Button>
      </Box>
    </SimpleGrid>
  );
}

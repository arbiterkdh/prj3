import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Center,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CenterBox from "../../../css/theme/component/box/CenterBox.jsx";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function MovieList() {
  const [movieList, setMovieList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/movie/list?page=${page}`)
      .then((res) => {
        setMovieList(res.data.movieList);
        setPageInfo(res.data.pageInfo);
      })
      .catch(() => {})
      .finally(() => {});
  }, [page]);

  function handleAddClick() {
    navigate("/movie/add");
  }

  function handleImageClick(movieId) {
    navigate(`/movie/view/${movieId}`);
  }

  function handlePageClick() {
    setPage(page + 1);
  }

  return (
    <Center>
      <CenterBox mb={10}>
        <Box mt={"-50px"} mb={10} ml={"930px"}>
          <Button colorScheme={"blue"} onClick={handleAddClick}>
            추가
          </Button>
        </Box>
        <SimpleGrid spacing={4} templateColumns="repeat(4, 1fr)">
          {movieList.map((movie) => (
            <Card key={movie.id} maxW="sm" mb={"30px"}>
              <CardBody>
                <Image
                  cursor={"pointer"}
                  onClick={() => handleImageClick(movie.id)}
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
        </SimpleGrid>
        {page !== pageInfo.lastPageNumber && (
          <Button
            rightIcon={<FontAwesomeIcon icon={faAngleDown} />}
            w={"100%"}
            onClick={handlePageClick}
          >
            더보기
          </Button>
        )}
      </CenterBox>
    </Center>
  );
}

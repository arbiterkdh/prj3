import {Box, Flex, Heading, Spacer} from "@chakra-ui/react";

export function Promo() {
  // const [promo, setPromo] = useState([]);
  //
  // useEffect(() => {
  //   axios.get("/api/promotion/promo").then((res) => setPromo(res.data));
  // }, []);
  //
  // if (promo.length === 0) {
  //   return <Spinner />;
  // }

  return <Box>
    <Heading>EVENT</Heading>
    <Flex direction="column">
      <Box>전체</Box>
      <Spacer />
      <Box>영화</Box>
      <Spacer />
      <Box>극장</Box>
      <Spacer />
      <Box>제휴/할인</Box>
    </Flex>
  </Box>


}

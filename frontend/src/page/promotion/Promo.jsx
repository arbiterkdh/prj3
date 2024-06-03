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
      <Box>11</Box>
      <Spacer />
      <Box>22</Box>
      <Spacer />
      <Box>33</Box>
    </Flex>
  </Box>


}

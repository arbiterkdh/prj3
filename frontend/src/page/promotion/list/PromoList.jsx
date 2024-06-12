import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function PromoList() {
  const [promoList, setPromoList] = useState([]);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    axios
      .get("/api/promotion/list")
      .then((res) => {
        setPromoList(res.data);
      })
      .catch(() => {})
      .finally(() => {});
  }, []);

  function handleButtonClick(promoId) {
    navigate(`/promotion/view/${promoId}`);
  }

  return (
    <Box>
      <SimpleGrid
        spacing={3}
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      >
        {promoList.map((promo) => (
          <Card key={promo.id} height="100%">
            <CardBody display="flex" flexDirection="column">
              <Image
                boxSize="100%"
                src="https://img.cgv.co.kr/WebApp/contents/eventV4/40714/17171440149400.jpg"
              />
              <Box flex={1}>
                <Heading as="b" mb={2}>
                  {promo.title}
                </Heading>
                <Text mb={2}>
                  {formatDate(promo.eventStartDate)} ~{" "}
                  {formatDate(promo.eventEndDate)}
                </Text>
              </Box>
              <CardFooter>
                <Button onClick={() => handleButtonClick(promo.id)}>
                  자세히 보기
                </Button>
              </CardFooter>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}

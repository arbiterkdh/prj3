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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function PromoList() {
  const [promoList, setPromoList] = useState([]);
  const navigate = useNavigate();

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
    navigate(`/movie/view/${promoId}`);
  }

  return (
    <Box>
      <SimpleGrid
        spacing={3}
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      >
        {promoList.map((promo) => (
          <Card key={promo.id}>
            <CardBody>
              <Image
                boxSize="100%"
                src="https://img.cgv.co.kr/WebApp/contents/eventV4/40714/17171440149400.jpg"
              />
              <Heading as="b">{promo.title}</Heading>
              {/*<Text>이벤트 시작/종료{promoStartDate}</Text>*/}
            </CardBody>
            <CardFooter>
              <Button onClick={() => handleButtonClick(promo.id)}>
                자세히 보기
              </Button>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}

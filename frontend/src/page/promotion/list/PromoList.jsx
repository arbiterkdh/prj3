import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function PromoList({ eventType: propEventType, maxItems }) {
  const [promoList, setPromoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { eventType: paramEventType } = useParams();
  const eventType = propEventType || paramEventType;
  const [promo, setPromo] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    axios
      .get("/api/promotion/list")
      .then((res) => {
        console.log(res.data); // 디버깅용 로그
        setPromoList(res.data);
      })
      .catch((error) => {
        console.error("프로모션 데이터 가져오기 에러:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredPromoList = eventType
    ? promoList.filter((promo) => promo.eventType === eventType)
    : promoList;

  const displayedPromos = maxItems
    ? filteredPromoList.slice(0, maxItems)
    : filteredPromoList;

  function handleButtonClick(promoId) {
    navigate(`/promotion/view/${promoId}`);
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box>
      <SimpleGrid
        spacing={3}
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      >
        {displayedPromos.map((promo) => (
          <Card key={promo.id} height="100%">
            <CardBody display="flex" flexDirection="column">
              <Box mt={4}>
                {promo.fileList &&
                  promo.fileList.map((file) => (
                    <Box key={file.name}>
                      <Image src={file.src} />
                    </Box>
                  ))}
              </Box>
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

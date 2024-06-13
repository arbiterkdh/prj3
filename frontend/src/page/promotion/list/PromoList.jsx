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
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function PromoList({ eventType }) {
  const [promoList, setPromoList] = useState([]);
  const navigate = useNavigate();
  const { eventTypeParam } = useParams();
  const eventTypeFilter = eventType || eventTypeParam;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const filteredPromoList = eventTypeFilter
    ? promoList.filter((promo) => promo.eventType === eventTypeFilter)
    : promoList;

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
        {filteredPromoList.map((promo) => (
          <Card key={promo.id} height="100%">
            <CardBody display="flex" flexDirection="column">
              <Box mt={4}>
                이미지파일
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

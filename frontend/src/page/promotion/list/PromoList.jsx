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

export function PromoList({ eventType, maxItems }) {
  const [promoList, setPromoList] = useState([]);
  const [promoDetails, setPromoDetails] = useState({});
  const navigate = useNavigate();
  const { eventTypeParam } = useParams();
  const eventTypeFilter = eventType || eventTypeParam;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const promoListResponse = await axios.get("/api/promotion/list");
        const promoListData = promoListResponse.data;
        setPromoList(promoListData);

        const promoDetailsData = {};
        for (const promo of promoListData) {
          const promoDetailResponse = await axios.get(
            `/api/promotion/${promo.id}`,
          );
          promoDetailsData[promo.id] = promoDetailResponse.data;
        }
        setPromoDetails(promoDetailsData);
      } catch (error) {
        console.error("프로모션 데이터 가져오기 에러:", error);
      }
    };

    fetchPromotions();
  }, []);

  const filteredPromoList = eventTypeFilter
    ? promoList.filter((promo) => promo.eventType === eventTypeFilter)
    : promoList;

  const displayedPromos = maxItems
    ? filteredPromoList.slice(0, maxItems)
    : filteredPromoList;

  const handleButtonClick = (promoId) => {
    navigate(`/promotion/view/${promoId}`);
  };

  return (
    <Box>
      <SimpleGrid
        spacing={3}
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      >
        {displayedPromos.map((promo) => {
          const promoDetail = promoDetails[promo.id] || {};
          return (
            <Card key={promo.id} height="100%">
              <CardBody display="flex" flexDirection="column">
                <Box mt={4}>
                  {promoDetail.fileList ? (
                    promoDetail.fileList.map((file) => (
                      <Box key={file.name}>
                        <Image src={file.src} alt={file.name} />
                      </Box>
                    ))
                  ) : (
                    <Text>이미지가 없습니다.</Text>
                  )}
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
          );
        })}
      </SimpleGrid>
    </Box>
  );
}

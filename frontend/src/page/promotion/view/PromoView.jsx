import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export function PromoView() {
  const { promoId } = useParams();
  const [promo, setPromo] = useState("");

  useEffect(() => {
    axios
      .get(`/api/promotion/${promoId}`)
      .then((res) => setPromo(res.data))
      .catch(() => {})
      .finally(() => {});
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Box>
      <Heading>{promo.title}</Heading>
      <Box>
        <Text>
          <strong>이벤트 타입:</strong> {promo.eventType}
        </Text>
        <Text>
          <strong>이벤트 시작일:</strong> {formatDate(promo.eventStartDate)}
        </Text>
        <Text>
          <strong>이벤트 종료일:</strong> {formatDate(promo.eventEndDate)}
        </Text>
      </Box>
      {/*<Box mt={4}>*/}
      {/*  <Image src={promo.imageUrl} alt={promo.title} />*/}
      {/*</Box>*/}
      <Box mt={4}>
        <Text>{promo.content}</Text>
      </Box>
    </Box>
  );
}

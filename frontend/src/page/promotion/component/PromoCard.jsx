import { Box, Card, CardBody, Heading, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const PromoCard = ({ promo }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/promotion/view/${promo.id}`);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString)
      .toLocaleDateString("ko-KR", options)
      .replace(/\.$/, "");
  };

  return (
    <Card
      key={promo.id}
      borderRadius="20px 20px 10px 10px"
      borderColor="gray.300"
      boxShadow="5px 5px 10px rgba(0, 0, 0, 0.2)"
      overflow="hidden"
      cursor="pointer"
      onClick={handleCardClick}
      width="226px" // 고정 카드 너비
      height="330px" // 고정 카드 높이
    >
      <CardBody display="flex" flexDirection="column" p={0}>
        {promo.isRecommended === true && promo.fileList?.length > 1 ? (
          <Box mb={0} height="230px" overflow="hidden" borderTopRadius="15px">
            <Image
              src={promo.fileList[1].src}
              objectFit="cover"
              height="100%"
              width="100%"
            />
          </Box>
        ) : (
          promo.fileList?.length > 0 && (
            <Box mb={0} height="230px" overflow="hidden" borderTopRadius="15px">
              <Image
                src={promo.fileList[0].src}
                objectFit="cover"
                height="100%"
                width="100%"
              />
            </Box>
          )
        )}
        <Box flex={1} p={1}>
          <Heading
            as="b"
            size="sx"
            mb={1}
            fontSize="14px"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {promo.title}
          </Heading>
          <Text fontSize="sm" color="gray.500">
            {formatDate(promo.eventStartDate)} ~{" "}
            {formatDate(promo.eventEndDate)}
          </Text>
        </Box>
      </CardBody>
    </Card>
  );
};

export default PromoCard;

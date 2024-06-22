import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const PromoCard = ({ promo }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/promotion/view/${promo.id}`);
  };

  return (
    <Card key={promo.id} height="100%">
      <CardBody display="flex" flexDirection="column">
        {promo.fileList?.length > 0 && (
          <Box mt={4}>
            <Image src={promo.fileList[0].src} />
          </Box>
        )}
        <Box m={3} flex={1}>
          <Heading as="b" mb={2}>
            {promo.title}
          </Heading>
          <Text mb={2}>
            {new Date(promo.eventStartDate).toLocaleDateString()} ~{" "}
            {new Date(promo.eventEndDate).toLocaleDateString()}
          </Text>
        </Box>
        <CardFooter>
          <Button onClick={handleButtonClick}>자세히 보기</Button>
        </CardFooter>
      </CardBody>
    </Card>
  );
};

export default PromoCard;

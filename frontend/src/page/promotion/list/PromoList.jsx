import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

export function PromoList() {
  const navigate = useNavigate();
  return (
    <Box>
      <SimpleGrid
        spacing={3}
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      >
        <Card>
          <CardBody>
            <Image
              boxSize="100%"
              src="https://img.cgv.co.kr/WebApp/contents/eventV4/40714/17171440149400.jpg"
            />
            <Text as="b">이벤트 제목</Text>
            <Text>2024.05.01~2024.05.20</Text>
          </CardBody>
          <CardFooter>
            <Button>자세히 보기</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardBody>
            <Image
              boxSize="100%"
              src="https://img.megabox.co.kr/SharedImg/event/2024/06/03/72bX99ejH4ApMb9eVO25CoLefKRRtqtm.jpg"
            />
            <Text as="b">text2</Text>
          </CardBody>
          <CardFooter>
            <Button>자세히 보기</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardBody>
            <Image boxSize="100%" src="https://bit.ly/dan-abramov" />
            <Text as="b">text3</Text>
          </CardBody>
          <CardFooter>
            <Button>자세히 보기</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardBody>
            <Image
              boxSize="100%"
              src="https://img.megabox.co.kr/SharedImg/event/2024/05/31/HjP5mCtbMmvHLJriWGIMgYFaKApz3sss.jpg"
            />
            <Text as="b">text4</Text>
          </CardBody>
          <CardFooter>
            <Button>자세히 보기</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardBody>
            <Image
              boxSize="100%"
              src="https://img.megabox.co.kr/SharedImg/event/2024/05/31/3J2kBBPmsWIPmFe8mrjAMUilvUGKai6n.jpg"
            />
            <Text as="b">text5</Text>
          </CardBody>
          <CardFooter>
            <Button>자세히 보기</Button>
          </CardFooter>
        </Card>
      </SimpleGrid>
    </Box>
  );
}

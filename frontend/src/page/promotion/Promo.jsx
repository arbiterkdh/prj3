import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Grid,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Spacer,
  Text
} from "@chakra-ui/react";

export function Promo() {
  return <Box>
    <Heading>EVENT</Heading>
    <Grid templateColumns='repeat(5, 1fr)' gap={5}>
      <GridItem w='100%' h='10' >전체</GridItem>
      <GridItem w='100%' h='10' >영화</GridItem>
      <GridItem w='100%' h='10' >극장</GridItem>
      <GridItem w='100%' h='10' >멤버십</GridItem>
      <GridItem w='100%' h='10' >제휴/할인</GridItem>
    </Grid>
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(250px, 1fr))'>
      <Card>
        <CardBody>
          <Image boxSize='100%' src='https://img.cgv.co.kr/WebApp/contents/eventV4/40714/17171440149400.jpg' />
          <Text>[인사이드아웃2]다시보기 시사회</Text>
          <Spacer/>
          <Text>2024.05.01~2024.05.20</Text>
        </CardBody>
        <CardFooter>
          <Button>View here</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardBody>
          <Image boxSize='100%' src='https://img.megabox.co.kr/SharedImg/event/2024/06/03/72bX99ejH4ApMb9eVO25CoLefKRRtqtm.jpg' />
          <Text>text2</Text>
        </CardBody>
        <CardFooter>
          <Button>View here</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardBody>
          <Image boxSize='100%' src='https://bit.ly/dan-abramov' />
          <Text>text3</Text>
        </CardBody>
        <CardFooter>
          <Button>View here</Button>
        </CardFooter>
      </Card>
    </SimpleGrid>
  </Box>
}

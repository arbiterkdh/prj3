import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Table,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import CenterBox from "../../css/theme/component/box/CenterBox.jsx";
import { TheaterList } from "./list/TheaterList.jsx";
import { TheaterAdd } from "./add/TheaterAdd.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TheaterNotification } from "./notification/TheaterNotification.jsx";

export function Theater() {
  const [theaterList, setTheaterList] = useState([]);
  const [isModifying, setIsModifying] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [cityName, setCityName] = useState("서울");

  const [recommendedPromos, setRecommendedPromos] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/theater`)
      .then((res) => {
        setCityList(res.data);
      })
      .catch()
      .finally();

    axios.get("/api/promotion/recommendations").then((res) => {
      setRecommendedPromos(res.data);
    });
  }, []);

  return (
    <Center>
      <CenterBox>
        <Heading>전체극장</Heading>
        <TheaterList
          cityName={cityName}
          setCityName={setCityName}
          cityList={cityList}
          setCityList={setCityList}
          theaterList={theaterList}
          setTheaterList={setTheaterList}
          isModifying={isModifying}
          isRemoving={isRemoving}
          setIsRemoving={setIsRemoving}
        />
        <TheaterAdd
          setCityName={setCityName}
          cityList={cityList}
          setIsModifying={setIsModifying}
        />
        {recommendedPromos.length > 0 && (
          <Box>
            <Heading mt={16} mb={8}>
              극장 이벤트
            </Heading>
            <Flex
              p={"6px"}
              h={"235px"}
              bgColor={"red.500"}
              _dark={{
                bgColor: "darkslategray",
              }}
              align={"center"}
            >
              <Box
                overflow={"hidden"}
                border={"4px solid"}
                color={"red.300"}
                _dark={{
                  color: "whiteAlpha.500",
                }}
                w={"50%"}
                onClick={() =>
                  navigate(`/promotion/view/${recommendedPromos[0].id}`)
                }
              >
                <Image
                  cursor={"pointer"}
                  transition="transform 0.3s ease"
                  _hover={{
                    transform: "scale(1.1)",
                  }}
                  borderRadius={"30px"}
                  src={
                    recommendedPromos[0].fileList[
                      recommendedPromos[0].fileList.length - 2
                    ].filePath
                  }
                />
              </Box>
              <Box
                overflow={"hidden"}
                border={"4px solid"}
                color={"red.300"}
                _dark={{
                  color: "whiteAlpha.500",
                }}
                w={"50%"}
                onClick={() =>
                  navigate(`/promotion/view/${recommendedPromos[1].id}`)
                }
              >
                <Image
                  cursor={"pointer"}
                  transition="transform 0.3s ease"
                  _hover={{
                    transform: "scale(1.1)",
                  }}
                  borderRadius={"30px"}
                  src={
                    recommendedPromos[1].fileList[
                      recommendedPromos[1].fileList.length - 2
                    ].filePath
                  }
                />
              </Box>
            </Flex>
          </Box>
        )}
        <Box>
          <Heading mt={16}>극장 공지사항</Heading>
          <Table>
            <Thead>
              <Tr>
                <Th>극장</Th>
                <Th>제목</Th>
                <Th>지역</Th>
                <Th>등록일</Th>
              </Tr>
            </Thead>
            <TheaterNotification />
          </Table>
        </Box>
      </CenterBox>
    </Center>
  );
}

import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import BorderSelect from "../../../css/theme/component/select/BorderSelect.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

export function BookMovieAddInTheaterBox({
  cityList,
  onScreenList,
  willScreenList,
}) {
  const [isCitySelected, setIsCitySelected] = useState("");
  const [isLocationSelected, setIsLocationSelected] = useState("");
  const [theaterNumber, setTheaterNumber] = useState(0);
  const [theaterList, setTheaterList] = useState([]);

  const [theaterBoxList, setTheaterBoxList] = useState([]);
  const [theaterBoxTimeTableList, setTheaterBoxTimeTableList] = useState([]);

  let theaterBoxWithTimeTableList = [];
  // 극장명과 영화이름이 필요해서 이렇게 따로 또 배열에 담아서 넣음.

  useEffect(() => {}, [theaterBoxList, theaterBoxTimeTableList]);

  function handleCitySelect(city) {
    axios.get(`/api/theater/list?city=${city}`).then((res) => {
      setTheaterList(res.data);
    });
  }

  function handleLocationSelect(theaterNumber) {
    axios
      .get(`/api/book/movielocation?theaternumber=${theaterNumber}`)
      .then((res) => {
        setTheaterBoxList(res.data.theaterBoxList);
        setTheaterBoxTimeTableList(res.data.theaterBoxTimeTableList);
      });
  }

  function handleClickTheaterBox() {
    axios.post("/api/theaterbox/add");
  }

  return (
    <Box>
      <Box mb={100}>
        <Heading>상영관에 영화 상영일정 작성</Heading>
        <Flex>
          <BorderSelect
            placeholder={"도시명"}
            value={isCitySelected}
            onChange={(e) => {
              handleCitySelect(e.target.value);
              setIsCitySelected(e.target.value);
              setIsLocationSelected("");
            }}
          >
            {cityList.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </BorderSelect>
          <BorderSelect
            placeholder={"지점명"}
            value={isLocationSelected}
            isDisabled={!isCitySelected}
            onChange={(e) => {
              handleLocationSelect(e.target.value);
              setTheaterNumber(e.target.value);
              setIsLocationSelected(e.target.value);
            }}
          >
            {theaterList.map((theater) => (
              <option key={theater.number} value={theater.number}>
                {theater.location}
              </option>
            ))}
          </BorderSelect>
          <Box w={"200%"}></Box>
        </Flex>
        <Table>
          <Thead>
            <Tr>
              <Th>극장명(theater_number)</Th>
              <Th>상영관(box_number)</Th>
              <Th>상영중인 영화(movie_id)</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {theaterBoxList.map((theaterBox, index) => (
              <Tr key={index}>
                <Td>
                  {theaterBox.theaterLocation} ({theaterBox.theaterNumber})
                </Td>
                <Td>{theaterBox.boxNumber} 관</Td>
                <Td>{theaterBox.movieTitle}</Td>
                <Td>
                  <Button onClick={handleClickTheaterBox}>상영영화 추가</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}

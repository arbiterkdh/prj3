import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import BorderSelect from "../../../css/theme/component/select/BorderSelect.jsx";
import { useState } from "react";
import axios from "axios";
import { BookTheaterBoxTimeTableManagementComponent } from "./BookTheaterBoxTimeTableManagementComponent.jsx";

export function BookMovieAddInTheaterBox({
  cityList,
  onScreenList,
  willScreenList,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isCitySelected, setIsCitySelected] = useState("");
  const [isLocationSelected, setIsLocationSelected] = useState("");
  const [theaterNumber, setTheaterNumber] = useState(0);
  const [theaterList, setTheaterList] = useState([]);

  const [theaterBoxList, setTheaterBoxList] = useState([]);

  const [theaterBox, setTheaterBox] = useState([]);

  const [modal, setModal] = useState(false);

  function handleCitySelect(city) {
    axios.get(`/api/theater/list?city=${city}`).then((res) => {
      setTheaterList(res.data);
    });
  }

  function handleLocationSelect(theaterNumber) {
    axios
      .get(`/api/book/movielocation?theaternumber=${theaterNumber}`)
      .then((res) => {
        setTheaterBoxList(res.data);
      });
  }

  return (
    <Box>
      <Box mt={"100px"} mb={"200px"}>
        <Heading>극장별 영화 상영 목록</Heading>
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
        {isLocationSelected && (
          <Table>
            <Thead>
              <Tr>
                <Th>상영관(theater_box.id)</Th>
                <Th>영화(movie_id) 리스트</Th>
                <Th w={"30%"}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {theaterBoxList.map((box, index) => (
                <Tr key={index}>
                  <Td>
                    {box.boxNumber} 관 ({box.id})
                  </Td>
                  <Td>
                    <Stack>
                      {box.theaterBoxMovieList.map((theaterBoxMovie, index) => (
                        <Box key={index}>
                          {index +
                            1 +
                            ". " +
                            theaterBoxMovie.movieTitle +
                            " (" +
                            theaterBoxMovie.movieId +
                            ")"}
                        </Box>
                      ))}
                    </Stack>
                  </Td>
                  <Td>
                    <Button
                      onClick={() => {
                        setTheaterBox(box);
                        onOpen();
                      }}
                    >
                      영화 상영표 작성
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
      <BookTheaterBoxTimeTableManagementComponent
        theaterBox={theaterBox}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </Box>
  );
}

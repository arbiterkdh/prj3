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
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BookTheaterBoxTimeTableManagementComponent } from "./BookTheaterBoxTimeTableManagementComponent.jsx";
import { BookTheaterBoxMovieManagementComponent } from "./BookTheaterBoxMovieManagementComponent.jsx";
import { LoginContext } from "../../../component/LoginProvider.jsx";

export function BookMovieAddInTheaterBox({
  cityList,
  onScreenList,
  willScreenList,
}) {
  const account = useContext(LoginContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: theaterBoxManageIsOpen,
    onOpen: theaterBoxManageOnOpen,
    onClose: theaterBoxOnClose,
  } = useDisclosure();

  const [isCitySelected, setIsCitySelected] = useState("");
  const [isLocationSelected, setIsLocationSelected] = useState("");
  const [theaterNumber, setTheaterNumber] = useState(0);
  const [theaterList, setTheaterList] = useState([]);

  const [theaterBoxList, setTheaterBoxList] = useState([]);

  const [theaterBox, setTheaterBox] = useState([]);

  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (theaterBox.id !== undefined) {
      axios.get(`/api/theaterbox/${theaterBox.id}`).then((res) => {
        setTheaterBox(res.data);
      });
    }
    if (isAdding) {
      handleLocationSelect(theaterNumber);
    }
  }, [theaterBoxOnClose, isAdding]);

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

  function handleClickAddTheaterBoxMovie(box) {
    setTheaterBox(box);
    theaterBoxManageOnOpen();
  }

  return (
    <Box>
      {account.isAdmin() && (
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
            <Box>
              <Table>
                <Thead>
                  <Tr>
                    <Th>상영관(theater_box.id)</Th>
                    <Th>영화(movie_id) 리스트</Th>
                    <Th w={"30%"}></Th>
                  </Tr>
                </Thead>
              </Table>
              <Box border={"1px solid"} h={"300px"} overflow={"scroll"}>
                <Table>
                  <Tbody>
                    {theaterBoxList.map((box, index) => (
                      <Tr key={index}>
                        <Td w={"37%"}>
                          {box.boxNumber} 관 ({box.id})
                        </Td>
                        <Td>
                          <Stack>
                            {box.theaterBoxMovieList.map(
                              (theaterBoxMovie, index) => (
                                <Box key={index}>
                                  {index +
                                    1 +
                                    ". " +
                                    theaterBoxMovie.movieTitle +
                                    " (" +
                                    theaterBoxMovie.movieId +
                                    ")"}
                                </Box>
                              ),
                            )}
                          </Stack>
                        </Td>
                        <Td>
                          <Flex>
                            <Button
                              onClick={() => handleClickAddTheaterBoxMovie(box)}
                            >
                              영화 추가/삭제
                            </Button>
                            <Button
                              onClick={() => {
                                setTheaterBox(box);
                                onOpen();
                              }}
                            >
                              상영표 작성
                            </Button>
                          </Flex>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </Box>
          )}
        </Box>
      )}
      <BookTheaterBoxMovieManagementComponent
        theaterBox={theaterBox}
        setTheaterBox={setTheaterBox}
        theaterBoxManageIsOpen={theaterBoxManageIsOpen}
        theaterBoxManageOnOpen={theaterBoxManageOnOpen}
        theaterBoxManageOnClose={theaterBoxOnClose}
        isAdding={isAdding}
        setIsAdding={setIsAdding}
      />
      <BookTheaterBoxTimeTableManagementComponent
        theaterBox={theaterBox}
        setTheaterBox={setTheaterBox}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        isAdding={isAdding}
        setIsAdding={setIsAdding}
      />
    </Box>
  );
}

import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BorderSelect from "../../../css/theme/component/select/BorderSelect.jsx";
import GapFlex from "../../../css/theme/component/flex/GapFlex.jsx";
import axios from "axios";

export function BookTheaterBoxMovieManagementComponent({
  theaterBox,
  setTheaterBox,
  theaterBoxManageIsOpen,
  theaterBoxManageOnOpen,
  theaterBoxManageOnClose,
  isAdding,
  setIsAdding,
}) {
  const [selectedMovieId, setSelectedMovieId] = useState(0);
  const [selectedMovieTitle, setSelectedMovieTitle] = useState("");

  const toast = useToast();

  useEffect(() => {
    if (theaterBox.id !== undefined && isAdding) {
      console.log(theaterBox);
      axios.get(`/api/theaterbox/${theaterBox.id}`).then((res) => {
        setTheaterBox(res.data);
      });
    }
  }, [isAdding]);

  function handleClickAddTheaterBoxMovie() {
    setIsAdding(true);
    axios
      .post("/api/theaterbox/theaterboxmovie/add", {
        movieId: selectedMovieId,
        theaterBoxId: theaterBox.id,
      })
      .then((res) => {
        toast({
          status: "success",
          description: `"${selectedMovieTitle}" 이(가) 상영 목록에 추가되었습니다.`,
          position: "bottom-right",
        });
      })
      .catch((err) => {
        if (err.response.status === 409) {
          toast({
            status: "warning",
            description: "이미 상영중인 영화입니다.",
            position: "bottom-right",
          });
        }
      })
      .finally(() => setIsAdding(false));
  }

  return (
    <Box>
      <Modal
        isOpen={theaterBoxManageIsOpen}
        onClose={theaterBoxManageOnClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent minW={"800px"} h={"600px"}>
          <ModalCloseButton />
          <ModalHeader mt={"10px"}>
            {theaterBox.theaterLocation}점 {theaterBox.boxNumber} 관 상영 영화
            추가/제거
          </ModalHeader>
          <ModalBody>
            <Stack>
              <GapFlex>
                <BorderSelect
                  placeholder={"상영 가능 목록"}
                  w={"250px"}
                  value={selectedMovieId}
                  onChange={(e) => {
                    let selected = e.target.value.split("\\");
                    setSelectedMovieId(selected[0]);
                    setSelectedMovieTitle(selected[1]);
                  }}
                >
                  {theaterBox.movieList &&
                    theaterBox.movieList.map((movie, index) => (
                      <option key={index} value={movie.id + "\\" + movie.title}>
                        {movie.title}
                      </option>
                    ))}
                </BorderSelect>
                <Button onClick={handleClickAddTheaterBoxMovie}>
                  상영 목록에 추가하기
                </Button>
              </GapFlex>
              <Box>
                <Box
                  fontWeight={"600"}
                  mx={"5px"}
                  mt={"45px"}
                  fontSize={"16px"}
                >
                  상영중인 영화 목록
                </Box>
                <Table>
                  <Thead>
                    <Tr>
                      <Th w={"33%"}>영화명</Th>
                      <Th w={"24%"}>장르</Th>
                      <Th w={"17%"}>개봉일</Th>
                      <Th>러닝타임</Th>
                      <Th>관리</Th>
                    </Tr>
                  </Thead>
                </Table>
                <Box border={"1px solid"} h={"320px"} overflow={"scroll"}>
                  <Table>
                    <Tbody>
                      {theaterBox.theaterBoxMovieList &&
                        theaterBox.theaterBoxMovieList.map(
                          (theaterBoxMovie, index) => (
                            <Tr key={index} h={"30px"}>
                              <Td w={"35%"}>{theaterBoxMovie.movieTitle}</Td>
                              <Td w={"26%"}>{theaterBoxMovie.genre}</Td>
                              <Td w={"22%"}>{theaterBoxMovie.startDate}</Td>
                              <Td>{theaterBoxMovie.runningTime}</Td>
                              <Td>
                                <Button size={"xs"}>삭제</Button>
                              </Td>
                            </Tr>
                          ),
                        )}
                    </Tbody>
                  </Table>
                </Box>
              </Box>
            </Stack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

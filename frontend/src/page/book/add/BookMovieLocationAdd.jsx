import BorderSelect from "../../../css/theme/component/select/BorderSelect.jsx";
import { Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function BookMovieLocationAdd() {
  const [movieList, setMovieList] = useState({});
  useEffect(() => {
    axios.get("/api/book/movie/list").then((res) => {});
  }, []);
  function handleClickMovieLocationAdd() {}

  return (
    <Flex my={"100px"}>
      <BorderSelect></BorderSelect>
      <BorderSelect></BorderSelect>
      <Button w={"200px"} onClick={handleClickMovieLocationAdd}>
        상영영화추가
      </Button>
    </Flex>
  );
}

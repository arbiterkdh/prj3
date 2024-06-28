import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

const PromoSearchBar = ({ onSearch }) => {
  const [promoSearch, setPromoSearch] = useState("");
  const location = useLocation();

  const handleSearch = () => {
    onSearch(promoSearch);
    setPromoSearch(""); // 검색 후 서치바 리셋
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    setPromoSearch("");
  }, [location.pathname]);

  return (
    <Box display="flex">
      <InputGroup mb={5} w={"300px"} size="md">
        <Input
          border={"3px solid #FF4357"}
          borderRadius={"20px"}
          value={promoSearch}
          onKeyDown={handleKeyDown}
          onChange={(e) => setPromoSearch(e.target.value)}
          placeholder="이벤트명을 입력해 주세요."
        />
        <InputRightElement width="4.5rem">
          <Button
            bgColor={"white"}
            _hover={{
              bgColor: "white",
            }}
            _dark={{
              color: "lightgray",
              bgColor: "#121212",
              _hover: {
                bgColor: "#121212",
              },
            }}
            onClick={handleSearch}
            h="1.75rem"
            size="md"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default PromoSearchBar;

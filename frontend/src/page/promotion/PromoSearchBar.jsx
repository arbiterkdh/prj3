import { Box, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const PromoSearchBar = ({ onSearch }) => {
  const [promoSearch, setPromoSearch] = useState("");

  const handleSearch = () => {
    onSearch(promoSearch);
  };

  return (
    <Box display="flex">
      <Input
        borderColor={"black"}
        width={"auto"}
        variant="outline"
        placeholder="제목을 입력해 주세요."
        value={promoSearch}
        onChange={(e) => setPromoSearch(e.target.value)}
      />
      <Button onClick={handleSearch} ml={2}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Button>
    </Box>
  );
};

export default PromoSearchBar;

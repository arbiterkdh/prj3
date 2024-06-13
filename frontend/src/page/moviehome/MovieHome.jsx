import { Center, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CenterBox from "../../css/theme/component/box/CenterBox.jsx";
import BookBox from "../../css/theme/component/box/BookBox.jsx";
import GapFlex from "../../css/theme/component/flex/GapFlex.jsx";

export function MovieHome() {
  const [files, setFiles] = useState([]);
  useEffect(() => {}, []);

  function handleClick() {}

  return (
    <Center>
      <CenterBox>
        <Heading>홈 화면</Heading>
        <GapFlex>
          <BookBox>예매율1위</BookBox>
          <BookBox>예매율2위</BookBox>
          <BookBox>예매율3위</BookBox>
          <BookBox>예매율4위</BookBox>
        </GapFlex>
      </CenterBox>
    </Center>
  );
}

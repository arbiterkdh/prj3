import {
  Box,
  Button,
  Center,
  Heading,
  Tab,
  TabList,
  Tabs,
} from "@chakra-ui/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CenterBox from "../../css/theme/component/box/CenterBox.jsx";
import { LoginContext } from "../../component/LoginProvider.jsx";
import { useContext } from "react";

export function PromoNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const account = useContext(LoginContext);

  const tabIndex =
    {
      "/promotion/all": 0,
      "/promotion/movie": 1,
      "/promotion/theater": 2,
      "/promotion/membership": 3,
      "/promotion/discount": 4,
    }[location.pathname.split("?")[0]] || 0;

  const handleTabClick = (path) => {
    if (location.pathname !== path) {
      navigate(path); // 기본 경로로 이동
    } else {
      navigate(path, { replace: true }); // 강제로 기본 경로로 이동
    }
  };

  return (
    <Center>
      <CenterBox>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={4}
        >
          <Heading
            onClick={() => navigate("/promotion/all")}
            style={{ cursor: "pointer" }}
          >
            진행중인 이벤트
          </Heading>
          {account.isAdmin() && (
            <Box display="flex" gap={2}>
              <Button
                bg={"green"}
                color={"white"}
                _hover={{ bg: "darkred" }}
                onClick={() => navigate("/promotion/add")}
                size="sm"
              >
                새글작성
              </Button>
            </Box>
          )}
        </Box>
        <Tabs isFitted variant="enclosed" width="100%" index={tabIndex}>
          <TabList mb="2em" borderColor={"red"}>
            <Tab onClick={() => handleTabClick("/promotion/all")}>전체</Tab>
            <Tab onClick={() => handleTabClick("/promotion/movie")}>영화</Tab>
            <Tab onClick={() => handleTabClick("/promotion/theater")}>극장</Tab>
            <Tab onClick={() => handleTabClick("/promotion/membership")}>
              멤버십
            </Tab>
            <Tab onClick={() => handleTabClick("/promotion/discount")}>
              제휴/할인
            </Tab>
          </TabList>
        </Tabs>
        <Outlet />
      </CenterBox>
    </Center>
  );
}

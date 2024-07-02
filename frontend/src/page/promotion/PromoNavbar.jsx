import {
  Box,
  Button,
  Center,
  Heading,
  Tab,
  TabList,
  Tabs,
  useColorModeValue,
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
      <CenterBox
        p={6}
        borderRadius="10px"
        boxShadow="md"
        bg={useColorModeValue("white", "gray.800")}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={4}
          pb={2}
        >
          <Heading
            onClick={() => navigate("/promotion/all")}
            style={{ cursor: "pointer", color: "red.500" }}
            fontSize="2xl"
            fontWeight="bold"
          >
            진행중인 이벤트
          </Heading>
          {account.isAdmin() && (
            <Box display="flex" gap={2}>
              <Button
                colorScheme="red"
                _hover={{ bg: "red.600" }}
                onClick={() => navigate("/promotion/add")}
                size="sm"
              >
                새글등록
              </Button>
            </Box>
          )}
        </Box>
        <Tabs isFitted variant="enclosed" width="100%" index={tabIndex}>
          <TabList
            borderBottom="2px solid"
            borderColor="red.500"
            _dark={{
              borderColor: "red.800",
            }}
            borderRadius="10px 10px 0 0"
            overflow="hidden" // 탭의 모서리가 둥글게 보이도록 하기 위해 추가
          >
            <Tab
              onClick={() => handleTabClick("/promotion/all")}
              _selected={{ color: "white", bg: "red.500" }}
              _hover={{ bg: "red.400" }}
              borderRadius="10px 0 0 0"
              _dark={{
                _selected: { color: "white", bg: "red.700" },
                _hover: { bg: "red.800" },
              }}
            >
              전체
            </Tab>
            <Tab
              onClick={() => handleTabClick("/promotion/movie")}
              _selected={{ color: "white", bg: "red.500" }}
              _hover={{ bg: "red.400" }}
              _dark={{
                _selected: { color: "white", bg: "red.700" },
                _hover: { bg: "red.800" },
              }}
            >
              영화
            </Tab>
            <Tab
              onClick={() => handleTabClick("/promotion/theater")}
              _selected={{ color: "white", bg: "red.500" }}
              _hover={{ bg: "red.400" }}
              _dark={{
                _selected: { color: "white", bg: "red.700" },
                _hover: { bg: "red.800" },
              }}
            >
              극장
            </Tab>
            <Tab
              onClick={() => handleTabClick("/promotion/membership")}
              _selected={{ color: "white", bg: "red.500" }}
              _hover={{ bg: "red.400" }}
              _dark={{
                _selected: { color: "white", bg: "red.700" },
                _hover: { bg: "red.800" },
              }}
            >
              멤버십
            </Tab>
            <Tab
              onClick={() => handleTabClick("/promotion/discount")}
              _selected={{ color: "white", bg: "red.500" }}
              _hover={{ bg: "red.400" }}
              borderRadius="0 10px 0 0"
              _dark={{
                _selected: { color: "white", bg: "red.700" },
                _hover: { bg: "red.800" },
              }}
            >
              제휴/할인
            </Tab>
          </TabList>
        </Tabs>
        <Outlet />
      </CenterBox>
    </Center>
  );
}

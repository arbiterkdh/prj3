import { extendTheme } from "@chakra-ui/react";

export const customTheme = extendTheme({
  breakpoints: {
    base: "0em",
    sm: "30em",
    md: "48em",
    lg: "64em", // 창이 줄어들어도 컴포넌트 크기 변하지 않기 위해 적용
    xl: "80em",
    "2xl": "96em",
  },
  styles: {
    global: {
      body: {
        // "-ms-user-select": "none",
        // "-moz-user-select": "none",
        // "-webkit-user-select": "none",
        // "-khtml-user-select": "none",
        // "user-select": "none",
        // 전역적으로 드래그 막고싶을 때 주석 해제하기
        textColor: "blackAlpha.900",
        bgColor: "#F2F5F5",
        _dark: {
          textColor: "whiteAlpha.800",
          bgColor: "#112325",
        },
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        _disabled: {
          cursor: "default",
        },
        m: "1",
      },
      variants: {
        solid: {
          _hover: {},
        },
        _dark: {
          _hover: {},
        },
      },
    },
    FormControl: {},
    FormLabel: {
      baseStyle: {},
    },
    Heading: {
      baseStyle: {
        mt: "10px",
        mb: "20px",
      },
      sizes: {
        xs: { fontSize: "2xl", lineHeight: "1.2rem" },
        sm: { fontSize: "2xl", lineHeight: "1.2rem" },
        md: { fontSize: "2xl", lineHeight: "1.2rem" },
        lg: { fontSize: "2xl", lineHeight: "1.2rem" },
        xl: { fontSize: "2xl", lineHeight: "1.2rem" },
      },
    },
    Input: {
      baseStyle: {
        field: {
          border: "1px solid gray",
          borderRadius: "none",
          m: "1",
          _disabled: {
            cursor: "default",
          },
          _focus: {},
          _dark: {
            _focus: {},
          },
        },
        element: {
          m: "1",
        },
      },
      variants: {},
      defaultProps: {
        variant: "custom",
      },
    },
    Select: {
      baseStyle: {
        field: {
          _disabled: {
            cursor: "default",
          },
          _focus: { border: "2px solid gray" },
          _dark: {},
        },
        icon: {},
      },
      defaultProps: {
        variant: "custom",
      },
    },
    Table: {
      baseStyle: {
        table: {
          thead: {
            th: {
              _dark: {},
            },
          },
          tbody: {
            tr: {
              _hover: {},
              _dark: {
                _hover: {},
              },
            },
          },
        },
      },
    },
    Tabs: {
      baseStyle: {
        tab: {
          _dark: {
            _selected: {},
          },
        },
        tablist: {
          mt: "20px",
          mb: "0px",
          button: {
            borderTopLeftRadius: "none",
            borderTopRightRadius: "none",
          },
        },
        tabpanels: {
          tabpanel: {},
        },
      },
    },
    Textarea: {
      baseStyle: {
        _focus: {},
        _dark: {
          _focus: {},
        },
      },
      variants: {},
      defaultProps: {
        variant: "custom",
      },
    },
  },
});

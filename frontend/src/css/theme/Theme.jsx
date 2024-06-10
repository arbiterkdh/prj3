import { extendTheme } from "@chakra-ui/react";

export const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        _dark: {},
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        m: "1",
      },
      variants: {
        solid: {
          _hover: {},
        },
        _disabled: {
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
      baseStyle: {},
      sizes: {
        xs: {},
        sm: {},
        md: {},
        lg: {},
        xl: {},
      },
    },
    Input: {
      baseStyle: {
        field: {
          border: "1px solid gray",
          borderRadius: "none",
          m: "1",
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
          _focus: { border: "2px solid gray" },
          _dark: {},
        },
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

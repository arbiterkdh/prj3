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
      baseStyle: {},
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
          _focus: {},
          _dark: {
            _focus: {},
          },
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
          _focus: {},
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

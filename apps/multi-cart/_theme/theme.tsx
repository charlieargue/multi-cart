import React from 'react'
import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = { mono: `'Menlo', monospace` }

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  colors: {
    // GREEN PALETTE, then you can just do i.e.: bg="900"
    // 100: "#E5FCF1",
    // 200: "#27EF96",
    // 300: "#10DE82",
    // 400: "#0EBE6F",
    // 500: "#0CA25F",
    // 600: "#0A864F",
    // 700: "#086F42",
    // 800: "#075C37",
    // 900: "#064C2E",
    "brand.pink": "#FF50BD",
    "brand.yellow": "#EDC346",
    fonts,
  },
  breakpoints,
  // thx: https://chakra-ui.com/docs/theming/customize-theme#customizing-component-styles
});

export default theme
// ##################################################################################
// ℹ️ NOT READY YET or NOT MY CODE (chakra templates) ----- please ignore this file, thanks!
// ##################################################################################

import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = { mono: `'Menlo', monospace` }

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

export const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  colors: {
    "brand.pink": "#FF50BD",
    "brand.yellow": "#EDC346",
    fonts,
  },
  breakpoints,
  // thx: https://chakra-ui.com/docs/theming/customize-theme#customizing-component-styles
});

export default theme;
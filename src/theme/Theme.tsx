import {  createSystem, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
    theme: {
      breakpoints: {
        sm: "320px",
        md: "768px",
        lg: "960px",
        xl: "1200px",
      },
      tokens: {
        colors: {
          red: { value: "#EE0F0F" },
        },
      },
      semanticTokens: {
        colors: {
          danger: { value: "{colors.red}" },
        },
      },
      keyframes: {
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
    },
  })

  const System = createSystem(config)
  
  export default System

  
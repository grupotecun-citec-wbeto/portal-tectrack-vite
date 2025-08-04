import {
    Flex,
    Image,
    Link,
    Stack,
    Text,
  } from "@chakra-ui/react";

  import { useColorModeValue,useColorMode } from "@components/ui/color-mode";
  import { Button } from "@components/ui/button";
  
  import SidebarHelpImage from "@assets/img/SidebarHelpImage.png";
  

  export function SidebarHelp() {
    // Pass the computed styles into the `__css` prop
    //const { children, sidebarVariant } = props;
    const textColor = useColorModeValue("gray.700", "white");
    const { colorMode } = useColorMode();
    return (
      <Stack
        justify='center'
        direction='column'
        align='center'
        spaceX="20"
        mb="22px"
        mt="auto"
        mx='20px'>
        <Image src={SidebarHelpImage} w='110px' h="auto" />
        <Flex direction='column' textAlign='center'>
          <Text fontSize='14px' color={textColor} fontWeight='bold'>
            Need help?
          </Text>
          <Text fontSize='12px' color='gray.500'>
            Please check our docs.
          </Text>
        </Flex>
        <Link href='https://demos.creative-tim.com/docs-argon-dashboard-chakra' minW='100%'>
          <Button variant='primary' minW='100%'>
            DOCUMENTATION
          </Button>
        </Link>
        <Link href='https://www.creative-tim.com/product/argon-dashboard-chakra-pro' minW='100%'>
          
            <Button
              variant={colorMode === "light" ? 'dark' : "navy"}
              minW='100%'
              mb={window.innerWidth <= 1024 && "12px"}>
              UPGRADE TO PRO
            </Button>
          
        </Link>
      </Stack>
    );
  }
  
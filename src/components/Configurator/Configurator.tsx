// Chakra Imports

import { useState } from "react";

import {
  Box,
  Flex, Link,
  Text,
} from "@chakra-ui/react";

import { Switch } from "@/components/ui/switch"

import { Button } from "@/components/ui/button"
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
} from "@/components/ui/drawer"


// components
import { useColorMode,useColorModeValue} from "@components/ui/color-mode";
import { HSeparator } from "@components/Separator/Separator";

// icons
import GitHubButton from "react-github-btn";
import { FaFacebook, FaTwitter } from "react-icons/fa";

interface ConfiguratorProps {
  sidebarVariant: string;
  setSidebarVariant: (variant: string) => void;
  secondary: boolean;
  open: boolean;
  setOpen: (open:boolean) => void;
  fixed: boolean;
  isChecked: boolean;
  onSwitch: (checked: boolean) => void;
}

export default function Configurator(props: ConfiguratorProps) {
  const {
    sidebarVariant,
    setSidebarVariant,
    secondary,
    open,
    setOpen,
    fixed,
    ...rest
  } = props;
  const [switched, setSwitched] = useState(rest.isChecked);

  const { colorMode, toggleColorMode } = useColorMode();

  let bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "white"
  );
  let colorButton = useColorModeValue("white", "gray.700");
  const secondaryButtonBg = useColorModeValue("white", "transparent");
  const secondaryButtonBorder = useColorModeValue("gray.700", "white");
  const secondaryButtonColor = useColorModeValue("gray.700", "white");
  const bgDrawer = useColorModeValue("white", "navy.800");
  //const settingsRef = React.useRef();
  return (
    <>
      
      <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DrawerBackdrop />
        <DrawerContent bg={bgDrawer}>
          <DrawerHeader>
            <DrawerTitle>Drawer Title</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <Flex flexDirection="column">
              <Flex justifyContent="space-between " mb="16px">
                <Text fontSize="md" fontWeight="600" mb="4px">
                  Navbar Fixed
                </Text>
                <Switch
                  colorScheme="blue"
                  checked={switched}
                  onChange={() => {
                    if (switched === true) {
                      rest.onSwitch(false);
                      setSwitched(false);
                    } else {
                      rest.onSwitch(true);
                      setSwitched(true);
                    }
                  }}
                />
              </Flex>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                mb="24px"
              >
                <Text fontSize="md" fontWeight="600" mb="4px">
                  Dark/Light
                </Text>
                <Button
                  onClick={toggleColorMode}
                  color={colorMode === "light" ? "Dark" : "Light"}
                >
                  Toggle {colorMode === "light" ? "Dark" : "Light"}
                </Button>
              </Flex>

              <HSeparator />
              <Box mt="24px">
                <Box>
                  <Link
                    href="https://www.creative-tim.com/product/argon-dashboard-chakra?ref=creativetim-pud"
                    w="100%"
                    mb="16px"
                  >
                    <Button
                      w="100%"
                      mb="16px"
                      bg={bgButton}
                      color={colorButton}
                      fontSize="xs"
                      variant="plain"
                      px="30px"
                    >
                      Free Download2
                    </Button>
                  </Link>
                  <Link
                    href="https://demos.creative-tim.com/docs-argon-dashboard-chakra/?ref=creativetim-pud"
                    w="100%"
                  >
                    <Button
                      w="100%"
                      bg={secondaryButtonBg}
                      border="1px solid"
                      borderColor={secondaryButtonBorder}
                      color={secondaryButtonColor}
                      fontSize="xs"
                      variant="plain"
                      px="20px"
                      mb="16px"
                    >
                      <Text textDecorationColor="none">Documentation</Text>
                    </Button>
                  </Link>
                </Box>
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  w="100%"
                  mb="16px"
                >
                  <GitHubButton
                    href="https://github.com/creativetimofficial/argon-dashboard-chakra"
                    data-icon="octicon-star"
                    data-show-count="true"
                    aria-label="Star creativetimofficial/argon-dashboard-chakra on GitHub"
                  >
                    Star
                  </GitHubButton>
                </Flex>
                <Box w="100%">
                  <Text mb="6px" textAlign="center">
                    Thank you for sharing!
                  </Text>
                  <Flex justifyContent="center" alignContent="center">
                    <Link
                      href="https://twitter.com/intent/tweet?url=https://www.creative-tim.com/product/argon-dashboard-chakra/&text=Check%20Argon%20Dashboard%20Chakra%20made%20by%20@simmmple_web%20and%20@CreativeTim"
                    >
                      <Button
                        colorScheme="twitter"
                        me="10px"
                      >
                        <FaTwitter />
                        <Text>Tweet</Text>
                      </Button>
                    </Link>
                    <Link
                      href="https://www.facebook.com/sharer/sharer.php?u=https://www.creative-tim.com/product/argon-dashboard-chakra/"
                    >
                      <Button colorScheme="facebook">
                        <FaFacebook />
                        <Text>Share</Text>
                      </Button>
                    </Link>
                  </Flex>
                </Box>
              </Box>
            </Flex>
          </DrawerBody>
          <DrawerFooter>
            <DrawerActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerActionTrigger>
            <Button>Save</Button>
          </DrawerFooter>
          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>
        
    </>
  );
}

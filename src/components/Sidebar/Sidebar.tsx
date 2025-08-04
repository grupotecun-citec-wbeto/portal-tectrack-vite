/*eslint-disable*/
import { HamburgerIcon } from "@chakra-ui/icons";
// chakra imports
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react";

// ACCORDION
import {
    AccordionItem,
    AccordionItemContent,
    AccordionItemTrigger,
    AccordionRoot,
  } from "@/components/ui/accordion"


import IconBox from "@components/Icons/IconBox";
import {
  renderThumbDark,
  renderThumbLight,
  renderTrack,
  renderTrackRTL,
  renderView,
  renderViewRTL
} from "@components/Scrollbar/Scrollbar";

import { HSeparator } from "@components/Separator/Separator";
import React,{useState,useContext,useRef} from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { NavLink, useLocation } from "react-router-dom";
import AppContext from "@/appContext";



// FUNCTIONS

function Sidebar(props) {

  // save list of the items accordion
  // to check for active links and opened collapses
  let location = useLocation();
  
  // w: content index active of de sidebar
  const [activeIndex, setActiveIndex] = useState(-1)
  const accordionItemsRotesRef = useRef([])
  const activeIndexRef = useRef(-1)
  // this is for the rest of the collapses
  const [state, setState] = React.useState({});
  const mainPanel = React.useRef();
  let variantChange = "0.2s linear";
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName,category=false) => {
    let locationpathname = (category) ? location.pathname.split('/').slice(0, -1).join('/') : location.pathname
    return locationpathname === routeName ? "active" : "";
  };
  const { colorMode } = useColorMode;
  // this function creates the links and collapses that appear in the sidebar (left menu)
  const { sidebarVariant } = props;

  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  // ACTIVE INDEX
  const { sideBarAccordionActiveIndex, setSideBarAccordionActiveIndex } = useContext(AppContext); // Acceder al contexto

  // Función que maneja el cambio


  const createLinks = (routes) => {
    // Chakra Color Mode
    let activeBg = useColorModeValue("white", "navy.700");
    let inactiveBg = useColorModeValue("white", "navy.700");
    let activeColor = useColorModeValue("gray.700", "white");
    let inactiveColor = useColorModeValue("gray.400", "gray.400");
    let sidebarActiveShadow = "0px 7px 11px rgba(0, 0, 0, 0.04)";

    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.category) {
        
        
        const ruta = prop.layout + prop.path
        if(!accordionItemsRotesRef.current.includes(ruta)) accordionItemsRotesRef.current.push(ruta)

        //itemsAccordion = itemsAccordion + 1
        var st = {};
        st[prop["state"]] = !state[prop.state];
        return (
            <>
            {(prop?.visible ?? true) && (
              <AccordionItem isCollapsed  borderWidth={0}>
                <h2>
                  
                    {activeRoute(prop.layout + prop.path,prop.category) === "active" ? (
                      <AccordionButton
                        boxSize="initial"
                        justifyContent="flex-start"
                        alignItems="center"
                        boxShadow={sidebarActiveShadow}
                        bg={activeBg}
                        transition={variantChange}
                        mb={{
                          xl: "0px",
                        }}
                        mx={{
                          xl: "auto",
                        }}
                        ps={{
                          sm: "5px",
                          xl: "8px",
                        }}
                        py="12px"
                        borderRadius="15px"
                        _hover="none"
                        w="100%"
                        _active={{
                          bg: "inherit",
                          transform: "none",
                          borderColor: "transparent",
                        }}
                        _focus={{
                          boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)",
                        }}
                      >
                        <Flex>
                          {typeof prop.icon === "string" ? (
                            <Icon>{prop.icon}</Icon>
                          ) : (
                            <IconBox
                              bg="blue.500"
                              color="white"
                              h="30px"
                              w="30px"
                              me="12px"
                              transition={variantChange}
                            >
                              {prop.icon}
                            </IconBox>
                          )}
                          <Text color={activeColor} my="auto" fontSize="sm">
                            {document.documentElement.dir === "rtl"
                              ? prop.rtlName
                              : prop.name}
                          </Text>
                        </Flex>
                        <AccordionIcon />
                      </AccordionButton>
                    ) : (
                      <AccordionButton
                        boxSize="initial"
                        justifyContent="flex-start"
                        alignItems="center"
                        bg="transparent"
                        mb={{
                          xl: "6px",
                        }}
                        mx={{
                          xl: "auto",
                        }}
                        py="12px"
                        ps={{
                          sm: "10px",
                          xl: "16px",
                        }}
                        borderRadius="15px"
                        _hover="none"
                        w="100%"
                        _active={{
                          bg: "inherit",
                          transform: "none",
                          borderColor: "transparent",
                        }}
                        _focus={{
                          boxShadow: "none",
                        }}
                      >
                        <Flex>
                          {typeof prop.icon === "string" ? (
                            <Icon>{prop.icon}</Icon>
                          ) : (
                            <IconBox
                              bg={inactiveBg}
                              color="blue.500"
                              h="30px"
                              w="30px"
                              me="12px"
                              transition={variantChange}
                            >
                              {prop.icon}
                            </IconBox>
                          )}
                          <Text color={inactiveColor} my="auto" fontSize="sm">
                            {document.documentElement.dir === "rtl"
                              ? prop.rtlName
                              : prop.name}
                          </Text>
                        </Flex>
                        <AccordionIcon />
                      </AccordionButton>
                    )}
                </h2>
                <AccordionPanel pb={4}>
                  {createLinks(prop.views)}
                </AccordionPanel>
              </AccordionItem>
            )}
            </>
            
        );
      }
      return (
        <>
          {(prop?.visible ?? true) && (
            <NavLink to={prop.layout + prop.path} key={key}>
              {activeRoute(prop.layout + prop.path) === "active" ? (
                <Button
                  boxSize="initial"
                  justifyContent="flex-start"
                  alignItems="center"
                  boxShadow={sidebarActiveShadow}
                  bg={activeBg}
                  transition={variantChange}
                  mb={{
                    xl: "6px",
                  }}
                  mx={{
                    xl: "auto",
                  }}
                  ps={{
                    sm: "10px",
                    xl: "16px",
                  }}
                  py="12px"
                  borderRadius="15px"
                  _hover="none"
                  w="100%"
                  _active={{
                    bg: "inherit",
                    transform: "none",
                    borderColor: "transparent",
                  }}
                  _focus={{
                    boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <Flex>
                    {typeof prop.icon === "string" ? (
                      <Icon>{prop.icon}</Icon>
                    ) : (
                      <IconBox
                        bg="blue.500"
                        color="white"
                        h="30px"
                        w="30px"
                        me="12px"
                        transition={variantChange}
                      >
                        {prop.icon}
                      </IconBox>
                    )}
                    <Text color={activeColor} my="auto" fontSize="sm">
                      {document.documentElement.dir === "rtl"
                        ? prop.rtlName
                        : prop.name}
                    </Text>
                  </Flex>
                </Button>
              ) : (
                <Button
                  boxSize="initial"
                  justifyContent="flex-start"
                  alignItems="center"
                  bg="transparent"
                  mb={{
                    xl: "6px",
                  }}
                  mx={{
                    xl: "auto",
                  }}
                  py="12px"
                  ps={{
                    sm: "10px",
                    xl: "16px",
                  }}
                  borderRadius="15px"
                  _hover="none"
                  w="100%"
                  _active={{
                    bg: "inherit",
                    transform: "none",
                    borderColor: "transparent",
                  }}
                  _focus={{
                    boxShadow: "none",
                  }}
                >
                  <Flex>
                    {typeof prop.icon === "string" ? (
                      <Icon>{prop.icon}</Icon>
                    ) : (
                      <IconBox
                        bg={inactiveBg}
                        color="blue.500"
                        h="30px"
                        w="30px"
                        me="12px"
                        transition={variantChange}
                      >
                        {prop.icon}
                      </IconBox>
                    )}
                    <Text color={inactiveColor} my="auto" fontSize="sm">
                      {document.documentElement.dir === "rtl"
                        ? prop.rtlName
                        : prop.name}
                    </Text>
                  </Flex>
                </Button>
              )}
            </NavLink>
          )}
        </>
      );
    });
  };
  const { logo, routes } = props;

  var links = <Accordion index={[activeIndex]} onChange={(index) => setActiveIndex(index)} allowToggle >{createLinks(routes)}</Accordion>;


  const categoryCurrent = location.pathname.split('/').slice(0, -1).join('/')
  const items = accordionItemsRotesRef.current
  
  const index = items.findIndex(item => item === categoryCurrent);
  if(activeIndexRef.current !=  index){
    activeIndexRef.current = index
    setActiveIndex(index)
  }  

  //  BRAND
  //  Chakra Color Mode
  let sidebarBg = useColorModeValue("white", "navy.800");
  let sidebarRadius = "20px";
  let sidebarMargins = "0px";
  var brand = (
    <Box pt={"25px"} mb="12px">
      {logo}
      <HSeparator my="26px" />
    </Box>
  );

  // SIDEBAR
  return (
    <Box ref={mainPanel}>
      <Box display={{base: "none", sm: "none", xl: "block" }} position="fixed">
        <Box
          bg={sidebarBg}
          transition={variantChange}
          w="260px"
          maxW="260px"
          ms={{
            sm: "16px",
          }}
          my={{
            sm: "16px",
          }}
          h="calc(100vh - 32px)"
          ps="20px"
          pe="20px"
          m={sidebarMargins}
          filter="drop-shadow(0px 5px 14px rgba(0, 0, 0, 0.05))"
          borderRadius={sidebarRadius}
        >
          <Scrollbars
            autoHide
            renderTrackVertical={
              document.documentElement.dir === "rtl"
                ? renderTrackRTL
                : renderTrack
            }
            renderThumbVertical={useColorModeValue(
              renderThumbLight,
              renderThumbDark
            )}
            renderView={
              document.documentElement.dir === "rtl"
                ? renderViewRTL
                : renderView
            }
          >
            <Box>{brand}</Box>
            <Stack direction="column" mb="40px">
              <Box>{links}</Box>
            </Stack>
            {/*<SidebarHelp sidebarVariant={sidebarVariant} />*/}
          </Scrollbars>
        </Box>
      </Box>
    </Box>
  );
}

// FUNCTIONS

export function SidebarResponsive(props) {
  // to check for active links and opened collapses
  let location = useLocation();
  const { logo, routes, colorMode, hamburgerColor, ...rest } = props;

   // w: content index active of de sidebar
   const [activeIndex, setActiveIndex] = useState(-1)
   const accordionItemsRotesRef = useRef([])
   const activeIndexRef = useRef(-1)
  // this is for the rest of the collapses
  const [state, setState] = React.useState({});
  const mainPanel = React.useRef();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName,category=false) => {
    let locationpathname = (category) ? location.pathname.split('/').slice(0, -1).join('/') : location.pathname
    return locationpathname === routeName ? "active" : "";
  };
  // Chakra Color Mode
  let activeBg = useColorModeValue("white", "navy.700");
  let inactiveBg = useColorModeValue("white", "navy.700");
  let activeColor = useColorModeValue("gray.700", "white");
  let inactiveColor = useColorModeValue("gray.400", "white");
  let sidebarActiveShadow = useColorModeValue(
    "0px 7px 11px rgba(0, 0, 0, 0.04)",
    "none"
  );
  let sidebarBackgroundColor = useColorModeValue("white", "navy.800");

  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.category) {

        const ruta = prop.layout + prop.path
        if(!accordionItemsRotesRef.current.includes(ruta)) accordionItemsRotesRef.current.push(ruta)

        var st = {};
        st[prop["state"]] = !state[prop.state];
        return (
          <>
            {(prop?.visible ?? true) && (
              <AccordionItem defaultIsOpen>
                <h2>
                    {activeRoute(prop.layout + prop.path,prop.category) === "active" ? (
                      <AccordionButton
                        boxSize="initial"
                        justifyContent="flex-start"
                        alignItems="center"
                        bg={activeBg}
                        boxShadow={sidebarActiveShadow}
                        mb={{
                          xl: "6px",
                        }}
                        mx={{
                          xl: "auto",
                        }}
                        ps={{
                          sm: "10px",
                          xl: "16px",
                        }}
                        py="12px"
                        borderRadius="15px"
                        _hover="none"
                        w="100%"
                        _active={{
                          bg: "inherit",
                          transform: "none",
                          borderColor: "transparent",
                        }}
                        _focus={{
                          boxShadow: "none",
                        }}
                      >
                        <Flex>
                          {typeof prop.icon === "string" ? (
                            <Icon>{prop.icon}</Icon>
                          ) : (
                            <IconBox
                              bg="blue.500"
                              color="white"
                              h="30px"
                              w="30px"
                              me="12px"
                            >
                              {prop.icon}
                            </IconBox>
                          )}
                          <Text color={activeColor} my="auto" fontSize="sm">
                            {document.documentElement.dir === "rtl"
                              ? prop.rtlName
                              : prop.name}
                          </Text>
                        </Flex>
                        <AccordionIcon />
                      </AccordionButton>
                    ) : (
                      <AccordionButton
                        boxSize="initial"
                        justifyContent="flex-start"
                        alignItems="center"
                        bg="transparent"
                        mb={{
                          xl: "6px",
                        }}
                        mx={{
                          xl: "auto",
                        }}
                        py="12px"
                        ps={{
                          sm: "5px",
                          xl: "8px",
                        }}
                        borderRadius="15px"
                        _hover="none"
                        w="100%"
                        _active={{
                          bg: "inherit",
                          transform: "none",
                          borderColor: "transparent",
                        }}
                        _focus={{
                          boxShadow: "none",
                        }}
                      >
                        <Flex>
                          {typeof prop.icon === "string" ? (
                            <Icon>{prop.icon}</Icon>
                          ) : (
                            <IconBox
                              bg={inactiveBg}
                              color="blue.500"
                              h="30px"
                              w="30px"
                              me="12px"
                            >
                              {prop.icon}
                            </IconBox>
                          )}
                          <Text color={inactiveColor} my="auto" fontSize="sm">
                            {document.documentElement.dir === "rtl"
                              ? prop.rtlName
                              : prop.name}
                          </Text>
                        </Flex>
                        <AccordionIcon />
                      </AccordionButton>
                    )}
                </h2>
                <AccordionPanel pb={4}>
                  {createLinks(prop.views)}
                </AccordionPanel>
              </AccordionItem>
            )}
          </>
            
        );
      }
      return (
        <>
            {(prop?.visible ?? true) && (
              <NavLink to={prop.layout + prop.path} key={key}>
                {activeRoute(prop.layout + prop.path) === "active" ? (
                  <Button
                    boxSize="initial"
                    justifyContent="flex-start"
                    alignItems="center"
                    bg={activeBg}
                    boxShadow={sidebarActiveShadow}
                    mb={{
                      xl: "6px",
                    }}
                    mx={{
                      xl: "auto",
                    }}
                    ps={{
                      sm: "10px",
                      xl: "16px",
                    }}
                    py="12px"
                    borderRadius="15px"
                    _hover="none"
                    w="100%"
                    _active={{
                      bg: "inherit",
                      transform: "none",
                      borderColor: "transparent",
                    }}
                    _focus={{
                      boxShadow: "none",
                    }}
                  >
                    <Flex>
                      {typeof prop.icon === "string" ? (
                        <Icon>{prop.icon}</Icon>
                      ) : (
                        <IconBox
                          bg="blue.500"
                          color="white"
                          h="30px"
                          w="30px"
                          me="12px"
                        >
                          {prop.icon}
                        </IconBox>
                      )}
                      <Text color={activeColor} my="auto" fontSize="sm">
                        {document.documentElement.dir === "rtl"
                          ? prop.rtlName
                          : prop.name}
                      </Text>
                    </Flex>
                  </Button>
                ) : (
                  <Button
                    boxSize="initial"
                    justifyContent="flex-start"
                    alignItems="center"
                    bg="transparent"
                    mb={{
                      xl: "6px",
                    }}
                    mx={{
                      xl: "auto",
                    }}
                    py="12px"
                    ps={{
                      sm: "10px",
                      xl: "16px",
                    }}
                    borderRadius="15px"
                    _hover="none"
                    w="100%"
                    _active={{
                      bg: "inherit",
                      transform: "none",
                      borderColor: "transparent",
                    }}
                    _focus={{
                      boxShadow: "none",
                    }}
                  >
                    <Flex>
                      {typeof prop.icon === "string" ? (
                        <Icon>{prop.icon}</Icon>
                      ) : (
                        <IconBox
                          bg={inactiveBg}
                          color="blue.500"
                          h="30px"
                          w="30px"
                          me="12px"
                        >
                          {prop.icon}
                        </IconBox>
                      )}
                      <Text color={inactiveColor} my="auto" fontSize="sm">
                        {document.documentElement.dir === "rtl"
                          ? prop.rtlName
                          : prop.name}
                      </Text>
                    </Flex>
                  </Button>
                )}
              </NavLink>
            )}
        </>
      );
    });
  };

  var links = <Accordion index={[activeIndex]} onChange={(index) => setActiveIndex(index)} allowToggle >{createLinks(routes)}</Accordion>;


  const categoryCurrent = location.pathname.split('/').slice(0, -1).join('/')
  const items = accordionItemsRotesRef.current
  
  const index = items.findIndex(item => item === categoryCurrent);
  if(activeIndexRef.current !=  index){
    activeIndexRef.current = index
    setActiveIndex(index)
  }  

  //  BRAND

  var brand = (
    <Box pt={"35px"} mb="8px">
      {logo}
      <HSeparator my="26px" />
    </Box>
  );

  // SIDEBAR
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  // Color variables
  return (
    <Flex
      display={{ sm: "flex", xl: "none" }}
      ref={mainPanel}
      alignItems="center"
    >
      <HamburgerIcon
        color={hamburgerColor}
        w="40px"
        h="40px"
        ref={btnRef}
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={document.documentElement.dir === "rtl" ? "right" : "left"}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          w="250px"
          maxW="250px"
          ms={{
            sm: "16px",
          }}
          my={{
            sm: "16px",
          }}
          borderRadius="16px"
          bg={sidebarBackgroundColor}
        >
          <DrawerCloseButton
            _focus={{ boxShadow: "none" }}
            _hover={{ boxShadow: "none" }}
          />
          <DrawerBody maxW="250px" px="1rem">
            <Box maxW="100%" h="100vh">
              <Box>{brand}</Box>
              <Stack direction="column" mb="40px">
                <Box>{links}</Box>
              </Stack>
              {/*<SidebarHelp />*/}
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default Sidebar;

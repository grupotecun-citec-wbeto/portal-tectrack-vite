// @ts-nocheck
/*eslint-disable*/
import { HamburgerIcon } from "@chakra-ui/icons";
// chakra imports
import {
  Box,
  Button,
  Collapse,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react";
import IconBox from "@dashboard/components/Icons/IconBox";
import {
  renderThumbDark,
  renderThumbLight,
  renderTrack,
  renderTrackRTL,
  renderView,
  renderViewRTL
} from "@dashboard/components/Scrollbar/Scrollbar";
import { HSeparator } from "@dashboard/components/Separator/Separator";
import { SidebarHelp } from "@dashboard/components/Sidebar/SidebarHelp";
import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";



// FUNCTIONS

function Sidebar(props) {
  // to check for active links and opened collapses
  let location = useLocation();
  // this is for the rest of the collapses
  const [state, setState] = React.useState({});
  
  // Auto-expand sidebar based on current route
  React.useEffect(() => {
    const currentPath = location.pathname;
    const newState = {};
    
    // Function to check if a route contains the current path
    const checkRouteMatch = (routes) => {
      for (const route of routes) {
        if (route.collapse && route.views) {
          // Check if any view in this collapse matches current path
          if (hasMatchingRoute(route.views, currentPath)) {
            newState[route.state] = true;
            // Recursively check nested collapses
            checkRouteMatch(route.views);
          }
        } else if (route.category && route.views) {
          checkRouteMatch(route.views);
        }
      }
    };
    
    // Helper function to check if routes contain current path
    const hasMatchingRoute = (routes, path) => {
      return routes.some(route => {
        if (route.layout && route.path) {
          const fullPath = route.layout + route.path;
          // For routes with parameters, check if current path starts with base path
          if (route.path.includes(':')) {
            const basePath = route.layout + route.path.split('/:')[0];
            return path.startsWith(basePath);
          }
          return fullPath === path;
        }
        if (route.views) {
          return hasMatchingRoute(route.views, path);
        }
        return false;
      });
    };
    
    checkRouteMatch(props.routes);
    setState(newState);
  }, [location.pathname, props.routes]);
  
  const mainPanel = React.useRef();
  let variantChange = "0.2s linear";
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };
  const { colorMode } = useColorMode();
  // this function creates the links and collapses that appear in the sidebar (left menu)
  const { sidebarVariant } = props;
  const createLinks = (routes, level = 0) => {
    // Chakra Color Mode
    let activeBg = useColorModeValue("white", "navy.700");
    let inactiveBg = useColorModeValue("white", "navy.700");
    let activeColor = useColorModeValue("gray.700", "white");
    let inactiveColor = useColorModeValue("gray.400", "gray.400");
    let sidebarActiveShadow = "0px 7px 11px rgba(0, 0, 0, 0.04)";
    
    // Calculate padding based on nesting level
    const paddingLeft = level > 0 ? `${16 + (level * 24)}px` : "16px";
    
    // Filter out routes that should be hidden from sidebar
    const visibleRoutes = routes.filter(route => !route.hideFromSidebar);
    
    return visibleRoutes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      
      // Handle collapse items (sub-menus)
      if (prop.collapse) {
        return (
          <div key={key}>
            <Button
              boxSize="initial"
              justifyContent="space-between"
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
                md: paddingLeft,
                lg: paddingLeft,
                xl: paddingLeft,
              }}
              pe="16px"
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
              onClick={() => setState(prevState => ({
                ...prevState,
                [prop.state]: !prevState[prop.state]
              }))}
            >
              <Flex alignItems="center">
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
              {state[prop.state] ? (
                <ChevronUpIcon color={inactiveColor} />
              ) : (
                <ChevronDownIcon color={inactiveColor} />
              )}
            </Button>
            <Collapse in={state[prop.state]}>
              <Box>
                {createLinks(prop.views, level + 1)}
              </Box>
            </Collapse>
          </div>
        );
      }
      
      // Handle category items
      if (prop.category) {
        var st = {};
        st[prop["state"]] = !state[prop.state];
        return (
          <div key={key}>
            <Text
              color={activeColor}
              fontWeight="bold"
              mb={{
                xl: "6px",
              }}
              mx="auto"
              ps={{
                sm: "10px",
                md: paddingLeft,
                lg: paddingLeft,
                xl: paddingLeft,
              }}
              py="12px"
            >
              {document.documentElement.dir === "rtl"
                ? prop.rtlName
                : prop.name}
            </Text>
            {createLinks(prop.views, level + 1)}
          </div>
        );
      }
      
      // Handle regular menu items
      return (
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
                md: paddingLeft,
                lg: paddingLeft,
                xl: paddingLeft,
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
                md: paddingLeft,
                lg: paddingLeft,
                xl: paddingLeft,
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
      );
    });
  };
  const { logo, routes } = props;

  var links = <>{createLinks(routes)}</>;
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
      <Box display={{ sm: "none", xl: "block" }} position="fixed">
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
            <SidebarHelp sidebarVariant={sidebarVariant} />
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

  // this is for the rest of the collapses
  const [state, setState] = React.useState({});
  
  // Auto-expand sidebar based on current route
  React.useEffect(() => {
    const currentPath = location.pathname;
    const newState = {};
    
    // Function to check if a route contains the current path
    const checkRouteMatch = (routes) => {
      for (const route of routes) {
        if (route.collapse && route.views) {
          // Check if any view in this collapse matches current path
          if (hasMatchingRoute(route.views, currentPath)) {
            newState[route.state] = true;
            // Recursively check nested collapses
            checkRouteMatch(route.views);
          }
        } else if (route.category && route.views) {
          checkRouteMatch(route.views);
        }
      }
    };
    
    // Helper function to check if routes contain current path
    const hasMatchingRoute = (routes, path) => {
      return routes.some(route => {
        if (route.layout && route.path) {
          const fullPath = route.layout + route.path;
          // For routes with parameters, check if current path starts with base path
          if (route.path.includes(':')) {
            const basePath = route.layout + route.path.split('/:')[0];
            return path.startsWith(basePath);
          }
          return fullPath === path;
        }
        if (route.views) {
          return hasMatchingRoute(route.views, path);
        }
        return false;
      });
    };
    
    checkRouteMatch(routes);
    setState(newState);
  }, [location.pathname, routes]);
  
  const mainPanel = React.useRef();
  let variantChange = "0.2s linear";
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
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
  const createLinks = (routes, level = 0) => {
    // Chakra Color Mode
    let activeBg = useColorModeValue("white", "navy.700");
    let inactiveBg = useColorModeValue("white", "navy.700");
    let activeColor = useColorModeValue("gray.700", "white");
    let inactiveColor = useColorModeValue("gray.400", "gray.400");
    let sidebarActiveShadow = "0px 7px 11px rgba(0, 0, 0, 0.04)";
    
    // Calculate padding based on nesting level
    const paddingLeft = level > 0 ? `${16 + (level * 24)}px` : "16px";
    
    // Filter out routes that should be hidden from sidebar
    const visibleRoutes = routes.filter(route => !route.hideFromSidebar);
    
    return visibleRoutes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      
      // Handle collapse items (sub-menus)
      if (prop.collapse) {
        return (
          <div key={key}>
            <Button
              boxSize="initial"
              justifyContent="space-between"
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
                md: paddingLeft,
                lg: paddingLeft,
                xl: paddingLeft,
              }}
              pe="16px"
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
              onClick={() => setState(prevState => ({
                ...prevState,
                [prop.state]: !prevState[prop.state]
              }))}
            >
              <Flex alignItems="center">
                {typeof prop.icon === "string" ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <IconBox
                    bg="inherit"
                    borderRadius="inherit"
                    h="16px"
                    w="16px"
                    me="8px"
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
              {state[prop.state] ? (
                <ChevronUpIcon color={inactiveColor} />
              ) : (
                <ChevronDownIcon color={inactiveColor} />
              )}
            </Button>
            <Collapse in={state[prop.state]}>
              <Box>
                {createLinks(prop.views, level + 1)}
              </Box>
            </Collapse>
          </div>
        );
      }
      
      // Handle category items
      if (prop.category) {
        var st = {};
        st[prop["state"]] = !state[prop.state];
        return (
          <div key={key}>
            <Text
              color={activeColor}
              fontWeight="bold"
              mb={{
                xl: "6px",
              }}
              mx="auto"
              ps={{
                sm: "10px",
                md: paddingLeft,
                lg: paddingLeft,
                xl: paddingLeft,
              }}
              py="12px"
            >
              {document.documentElement.dir === "rtl"
                ? prop.rtlName
                : prop.name}
            </Text>
            {createLinks(prop.views, level + 1)}
          </div>
        );
      }
      
      // Handle regular menu items
      return (
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
                md: paddingLeft,
                lg: paddingLeft,
                xl: paddingLeft,
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
                    bg="inherit"
                    borderRadius="inherit"
                    h="16px"
                    w="16px"
                    me="8px"
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
                md: paddingLeft,
                lg: paddingLeft,
                xl: paddingLeft,
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
                    bg="inherit"
                    borderRadius="inherit"
                    h="16px"
                    w="16px"
                    me="8px"
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
      );
    });
  };

  var links = <>{createLinks(routes)}</>;

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
        w="18px"
        h="18px"
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
              <SidebarHelp />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default Sidebar;

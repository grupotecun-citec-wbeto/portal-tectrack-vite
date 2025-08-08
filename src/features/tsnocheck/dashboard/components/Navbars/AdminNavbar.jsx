// Chakra Imports
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Link,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import AdminNavbarLinks from "./AdminNavbarLinks";

export default function AdminNavbar(props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", changeNavbar);

    return () => {
      window.removeEventListener("scroll", changeNavbar);
    }
  })

  const {
    variant,
    children,
    fixed,
    secondary,
    brandText,
    routes,
    onOpen,
    ...rest
  } = props;

  // Función para generar breadcrumbs dinámicos con rutas
  const getBreadcrumbsWithRoutes = (routes) => {
    const currentPath = window.location.pathname;
    let breadcrumbs = [{ name: "Pages", path: "/admin/dashboard" }];
    
    // Función auxiliar para encontrar la primera ruta válida en un grupo
    const findFirstValidRoute = (routeArray) => {
      for (let route of routeArray) {
        if (route.layout && route.path) {
          return route.layout + route.path;
        } else if (route.views) {
          const found = findFirstValidRoute(route.views);
          if (found) return found;
        }
      }
      return null;
    };
    
    const findPathInRoutes = (routeArray, path, currentBreadcrumb = []) => {
      for (let route of routeArray) {
        if (route.collapse && route.views) {
          // Es un collapse, buscar la primera ruta válida para usar como enlace
          const collapsePath = findFirstValidRoute(route.views) || "/admin/dashboard";
          const newBreadcrumb = [...currentBreadcrumb, { name: route.name, path: collapsePath }];
          const found = findPathInRoutes(route.views, path, newBreadcrumb);
          if (found) return found;
        } else if (route.category && route.views) {
          // Es una categoría, buscar en sus views sin agregar el nombre de la categoría
          const found = findPathInRoutes(route.views, path, currentBreadcrumb);
          if (found) return found;
        } else if (route.layout && route.path) {
          // Es una ruta normal
          const fullPath = route.layout + route.path;
          if (fullPath === path) {
            return [...currentBreadcrumb, { name: route.name, path: fullPath }];
          }
        }
      }
      return null;
    };
    
    const foundPath = findPathInRoutes(routes || [], currentPath, []);
    if (foundPath && foundPath.length > 0) {
      breadcrumbs = [{ name: "Pages", path: "/admin/dashboard" }, ...foundPath];
    }
    
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbsWithRoutes(routes);

  // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
  let mainText = (fixed && scrolled) ? useColorModeValue("gray.700", "gray.200") : useColorModeValue("white", "gray.200");
  let secondaryText = (fixed && scrolled) ? useColorModeValue("gray.700", "gray.200") : useColorModeValue("white", "gray.200");
  let navbarPosition = "absolute";
  let navbarFilter = "none";
  let navbarBackdrop = "none";
  let navbarShadow = "none";
  let navbarBg = "none";
  let navbarBorder = "transparent";
  let secondaryMargin = "0px";
  let paddingX = "15px";
  if (props.fixed === true)
    if (scrolled === true) {
      navbarPosition = "fixed";
      navbarShadow = useColorModeValue(
        "0px 7px 23px rgba(0, 0, 0, 0.05)",
        "none"
      );
      navbarBg = useColorModeValue(
        "linear-gradient(112.83deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.8) 110.84%)",
        "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
      );
      navbarBorder = useColorModeValue("#FFFFFF", "rgba(255, 255, 255, 0.31)");
      navbarFilter = useColorModeValue(
        "none",
        "drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))"
      );
    }
  if (props.secondary) {
    navbarBackdrop = "none";
    navbarPosition = "absolute";
    mainText = "white";
    secondaryText = "white";
    secondaryMargin = "22px";
    paddingX = "30px";
  }
  const changeNavbar = () => {
    if (window.scrollY > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  
  return (
    <Flex
      position={navbarPosition}
      boxShadow={navbarShadow}
      bg={navbarBg}
      borderColor={navbarBorder}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      borderWidth="1.5px"
      borderStyle="solid"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      alignItems={{ xl: "center" }}
      borderRadius="16px"
      display="flex"
      minH="75px"
      justifyContent={{ xl: "center" }}
      lineHeight="25.6px"
      mx="auto"
      mt={secondaryMargin}
      pb="8px"
      left={document.documentElement.dir === "rtl" ? "30px" : ""}
      right={document.documentElement.dir === "rtl" ? "" : "30px"}
      px={{
        sm: paddingX,
        md: "30px",
      }}
      ps={{
        xl: "12px",
      }}
      pt="8px"
      top="18px"
      w={{ sm: "calc(100vw - 30px)", xl: "calc(100vw - 75px - 275px)" }}
    >
      <Flex
        w="100%"
        flexDirection={{
          sm: "column",
          md: "row",
        }}
        alignItems={{ xl: "center" }}
      >
        <Box mb={{ sm: "8px", md: "0px" }}>
          <Breadcrumb>
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <BreadcrumbItem key={index} color={mainText}>
                  {isLast ? (
                    <BreadcrumbLink color={mainText}>
                      {crumb.name}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbLink 
                      as={RouterLink}
                      to={crumb.path}
                      color={secondaryText}
                      _hover={{ 
                        color: mainText,
                        textDecoration: "underline"
                      }}
                    >
                      {crumb.name}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              );
            })}
          </Breadcrumb>
          {/* Here we create navbar brand, based on route name */}
          <Link
            color={mainText}
            href="#"
            bg="inherit"
            borderRadius="inherit"
            fontWeight="bold"
            _hover={{ color: { mainText } }}
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}
          >
            {brandText}
          </Link>
        </Box>
        <Box ms="auto" w={{ sm: "100%", md: "unset" }}>
          <AdminNavbarLinks
            onOpen={props.onOpen}
            logoText={props.logoText}
            secondary={props.secondary}
            fixed={props.fixed}
            scrolled={scrolled}
          />
        </Box>
      </Flex>
    </Flex>
  );
}

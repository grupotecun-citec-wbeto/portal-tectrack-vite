// Chakra imports
import {
  Portal,
  useDisclosure,
  Stack,
  Box,
  Image,
} from "@chakra-ui/react";

import { useColorMode } from "@/components/ui/color-mode";

// TECTRACK CUSTOM
//import useTransladoDb from "hookDB/transladoDB";


import Configurator from "@components/Configurator/Configurator";
import Footer from "@components/Footer/Footer.js";
/*import {
  ArgonLogoDark,
  ArgonLogoLight,
  ChakraLogoDark,
  ChakraLogoLight,
} from "@components/Icons/Icons";*/
// Layout components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import React, { useState } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import routes from "routes.js";
// Custom Chakra theme
import FixedPlugin from "../components/FixedPlugin/FixedPlugin";
// Custom components
import MainPanel from "../components/Layout/MainPanel";
import PanelContainer from "../components/Layout/PanelContainer";
import PanelContent from "../components/Layout/PanelContent";
import bgAdmin from "assets/img/admin-background.png";

// imagenes
import citec_png from "assets/img/CITEC.png";
import tecun_png from "assets/img/TECUN_isotipo.png";
import medallon_naranja from "assets/img/Medallones Tecun-04.png" // color naranja


export default function Dashboard(props) {
  const { ...rest } = props;

  //useTransladoDb() // cargar correción de base de datos hacia base de datos distribuidas

  // states and functions
  const [fixed, setFixed] = useState(false);
  const { colorMode } = useColorMode();

  const location = useLocation()


  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== "/admin/full-screen-maps";
  };

  const getCategories = () => {
    return location.pathname.split('/').slice(2, -1)
  }

  const getActiveRoute = (routes) => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].views);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  // This changes navbar state(fixed or not)
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].views);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          if (routes[i].secondaryNavbar) {
            return routes[i].secondaryNavbar;
          }
        }
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.category) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        let params = ``
        prop?.params?.map( (param) =>{
            params += `/:${param}`
        })
        return (
          <Route
            path={prop.layout + prop.path + params}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  document.documentElement.dir = "ltr";
  // Chakra Color Mode
  return (
    <Box>
      <Box
        minH='40vh'
        w='100%'
        position='absolute'
        bgImage={colorMode === "light" ? bgAdmin : "none"}
        bg={colorMode === "light" ? bgAdmin : "navy.900"}
        bgSize='cover'
        top='0'
      />
      <Sidebar
        routes={routes}
        logo={
          <Stack direction='row' spacing='12px' align='center' justify='center'>
            {colorMode === "dark" ? (
                <Image
                  src={citec_png}
                  alt="Imagen de ejemplo"
                  borderRadius="lg"
                  w={{xs:"75px",sm:"50px",md:"75px"}}
                />
            ) : (
                <Image
                  src={citec_png}
                  alt="Imagen de ejemplo"
                  borderRadius="lg"
                  w={{xs:"75px",sm:"50px",md:"75px"}}
                />
            )}
            <Box
              w='1px'
              h='20px'
              bg={colorMode === "dark" ? "white" : "gray.700"}
            />
            {colorMode === "dark" ? (
              <Image
                src={tecun_png}
                alt="Imagen de ejemplo"
                borderRadius="lg"
                w={{xs:"75px",sm:"50px",md:"75px"}}
              />
            ) : (
              <Image
                src={medallon_naranja}
                alt="Imagen de ejemplo"
                borderRadius="lg"
                w={{xs:"75px",sm:"50px",md:"75px"}}
              />
            )}
          </Stack>
        }
        display='none'
        {...rest}
      />
      <MainPanel
        w={{
          base: "100%",
          xl: "calc(100% - 275px)",
        }}>
        <Portal>
          <AdminNavbar
            onOpen={onOpen}
            brandText={getActiveRoute(routes)}
            secondary={getActiveNavbar(routes)}
            categories={getCategories() ?? []}
            fixed={fixed}
            {...rest}
          />
        </Portal>
        {getRoute() ? (
          <PanelContent>
            <PanelContainer>
              <Switch>
                {getRoutes(routes)}
                <Redirect from='/admin' to='/admin/dashboard' />
              </Switch>
            </PanelContainer>
          </PanelContent>
        ) : null}
        <Footer />
        <Portal>
          <FixedPlugin
            secondary={getActiveNavbar(routes)}
            fixed={fixed}
            onOpen={onOpen}
          />
        </Portal>
        <Configurator
          secondary={getActiveNavbar(routes)}
          isOpen={isOpen}
          onClose={onClose}
          isChecked={fixed}
          onSwitch={(value) => {
            setFixed(value);
          }}
        />
      </MainPanel>
    </Box>
  );
}

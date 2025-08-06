
// @ts-nocheck
/*!

=========================================================
* Argon Dashboard Chakra - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-chakra
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-chakra/blob/master/LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { StrictMode } from 'react'
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "@/features/tsnocheck/dashboard/layouts/Auth";
import AdminLayout from "@/features/tsnocheck/dashboard/layouts/Admin";
import RTLLayout from "@/features/tsnocheck/dashboard/layouts/RTL"; // Chakra imports
import { ChakraProvider } from "@chakra-ui/react";
// Custom Chakra theme
import theme from "@dashboard/theme/theme";

ReactDOM.render(
  <ChakraProvider theme={theme} resetCss={false} position="relative">
    <BrowserRouter>
      <Switch>
        <Route path={`/auth`} component={AuthLayout} />
        <Route path={`/admin`} component={AdminLayout} />
        <Route path={`/rtl`} component={RTLLayout} />
        <Redirect from={`/`} to="/admin/dashboard" />
      </Switch>
    </BrowserRouter>
  </ChakraProvider>,
  document.getElementById("root")
);


// @ts-nocheck
// import
import React, { Component }  from 'react';
import Dashboard from "./views/Dashboard/Dashboard.jsx";
import Tables from "./views/Dashboard/Tables.jsx";
import Billing from "./views/Dashboard/Billing.jsx";
import Datos from "./views/Dashboard/Datos.jsx";
import Datos2 from "./views/Dashboard/Datos2.jsx";
import DatosWithId from "./views/Dashboard/DatosWithId.jsx";
import WizardExample from "./views/Dashboard/WizardCreateCaso.jsx";
import WizardBasico from "./views/Dashboard/WizardBasico.jsx";
import CasosList from "./views/Dashboard/CasosList.jsx";
import RTLPage from "./views/RTL/RTLPage.jsx";
import Profile from "./views/Dashboard/Profile.jsx";
import SignIn from "./views/Pages/SignIn.jsx";
import SignUp from "./views/Pages/SignUp.jsx";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "@dashboard/components/Icons/Icons";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color='inherit' />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/casos",
    name: "Casos",
    rtlName: "الحالات",
    icon: <SupportIcon color='inherit' />,
    component: CasosList,
    layout: "/admin",
  },
  {
    name: "Pages",
    rtlName: "صفحات",
    icon: <DocumentIcon color='inherit' />,
    collapse: true,
    state: "pagesCollapse",
    views: [
      {
        path: "/profile",
        name: "Profile",
        rtlName: "لوحة القيادة",
        icon: <PersonIcon color='inherit' />,
        component: Profile,
        layout: "/admin",
      },
      {
        path: "/wizard",
        name: "Wizard Create Caso",
        rtlName: "المعالج إنشاء حالة",
        icon: <StatsIcon color='inherit' />,
        component: WizardExample,
        layout: "/admin",
      },
      {
        path: "/wizard-basico",
        name: "Wizard Básico",
        rtlName: "المعالج الأساسي",
        icon: <RocketIcon color='inherit' />,
        component: WizardBasico,
        layout: "/admin",
      },
      {
        path: "/signin",
        name: "Sign In",
        rtlName: "تسجيل الدخول",
        icon: <PersonIcon color='inherit' />,
        component: SignIn,
        layout: "/auth",
      },
      {
        path: "/signup",
        name: "Sign Up",
        rtlName: "تسجيل",
        icon: <RocketIcon color='inherit' />,
        component: SignUp,
        layout: "/auth",
      },
    ],
  },
  {
    name: "Tables & Data",
    rtlName: "الجداول والبيانات",
    icon: <StatsIcon color='inherit' />,
    collapse: true,
    state: "tablesCollapse",
    views: [
      {
                path: "/tables",
                name: "Tables Main",
                rtlName: "الجداول الرئيسية",
                icon: <StatsIcon color='inherit' />,
                component: Tables,
                layout: "/admin",
      },
      {
        path: "/profile",
        name: "Profile",
        rtlName: "لوحة القيادة",
        icon: <PersonIcon color='inherit' />,
        component: Profile,
        layout: "/admin",
      },
      {
        name: "TablesInterface",
        rtlName: "لوحة القيادة",
        icon: <StatsIcon color='inherit' />,
        collapse: true,
        state: "tablesCollapseInterface",
        views: [
          {
            path: "/tablesydata/tablesinterface/billing",
            name: "Billing",
            rtlName: "لوحة القيادة",
            icon: <CreditIcon color='inherit' />,
            component: Billing,
            layout: "/admin",
          },
          {
            name: "Tables",
            rtlName: "الجداول",
            icon: <StatsIcon color='inherit' />,
            collapse: true,
            state: "tablesSubCollapse",
            views: [
              {
                path: "/tables",
                name: "Tables Main",
                rtlName: "الجداول الرئيسية",
                icon: <StatsIcon color='inherit' />,
                component: Tables,
                layout: "/admin",
              },
              {
                path: "/tables/datos",
                name: "Datos",
                rtlName: "البيانات",
                icon: <StatsIcon color='inherit' />,
                component: Datos,
                layout: "/admin",
              },
              {
                path: "/tables/datos/:id",
                name: "Datos Details",
                rtlName: "تفاصيل البيانات",
                icon: <StatsIcon color='inherit' />,
                component: DatosWithId,
                layout: "/admin",
                hideFromSidebar: true,
              },
              {
                path: "/tables/datos4/:id",
                name: "Dato3 Details",
                rtlName: "تفاصيل البيانات",
                icon: <StatsIcon color='inherit' />,
                component: DatosWithId,
                layout: "/admin",
                hideFromSidebar: true,
              },
              {
                path: "/tables/datos2",
                name: "Datos2",
                rtlName: "البيانات",
                icon: <StatsIcon color='inherit' />,
                component: Datos2,
                layout: "/admin",
              },
              {
                path: "/tables/datos2/:id",
                name: "Datos2 Details",
                rtlName: "تفاصيل البيانات 2",
                icon: <StatsIcon color='inherit' />,
                component: DatosWithId,
                layout: "/admin",
                hideFromSidebar: true,
              },
            ]
          },
        ]
      }
    ],
  },
  {
    path: "/rtl-support-page",
    name: "RTL",
    rtlName: "آرتيإل",
    icon: <SupportIcon color='inherit' />,
    component: RTLPage,
    layout: "/rtl",
  },
  {
    name: "ACCOUNT PAGES",
    category: "account",
    rtlName: "صفحات",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Profile",
        rtlName: "لوحة القيادة",
        icon: <PersonIcon color='inherit' />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
      },
      {
        path: "/signin",
        name: "Sign In",
        rtlName: "لوحة القيادة",
        icon: <DocumentIcon color='inherit' />,
        component: SignIn,
        layout: "/auth",
      },
      {
        path: "/signup",
        name: "Sign Up",
        rtlName: "لوحة القيادة",
        icon: <RocketIcon color='inherit' />,
        component: SignUp,
        layout: "/auth",
      },
    ],
  },
];
export default dashRoutes;

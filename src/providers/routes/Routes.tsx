import { Authenticated } from "@refinedev/core";
import { ErrorComponent, ThemedLayoutV2 } from "@refinedev/antd";

import {
  NavigateToResource,
  CatchAllNavigate,
} from "@refinedev/react-router-v6";
import { Routes as ReactRoutes, Route, Outlet } from "react-router-dom";

import "@refinedev/antd/dist/reset.css";

import {
  EmployeeCreate,
  EmployeeEdit,
  EmployeeList,
  EmployeeShow,
} from "pages/employee";
import { Title } from "@/components/title";
import React from "react";
import { AuthPage } from "pages/auth";
import TimesheetTablePage from "pages/dashboard";
import { Layout } from "@/layout";
import PersonalTimesheetPage from "pages/timesheet";
import { LeaveRequestCreate } from "@/pages/timesheet/create";
import dayjs from "dayjs";

const Routes = () => {
  return (
    <ReactRoutes>
      <Route
        element={
          <Authenticated
            key="authenticated-routes"
            fallback={<CatchAllNavigate to="/login" />}
            v3LegacyAuthProviderCompatible
          >
            <Layout>
              <Outlet />
            </Layout>
          </Authenticated>
        }
      >
        <Route index element={<TimesheetTablePage />} />

        <Route path="/timesheet">
          <Route index element={<PersonalTimesheetPage />} />
          <Route path="create-leave-request" element={<LeaveRequestCreate />} />
          <Route path="edit/:id" element={<EmployeeEdit />} />
          <Route path="show/:id" element={<EmployeeShow />} />
        </Route>
        <Route path="/employees">
          <Route index element={<EmployeeList />} />
          <Route path="create" element={<EmployeeCreate />} />
          <Route path="edit/:id" element={<EmployeeEdit />} />
          <Route path="show/:id" element={<EmployeeShow />} />
        </Route>
      </Route>

      <Route
        element={
          <Authenticated
            key="auth-pages"
            fallback={<Outlet />}
            v3LegacyAuthProviderCompatible
          >
            <NavigateToResource resource="dashboard" />
          </Authenticated>
        }
      >
        <Route
          path="/login"
          element={
            <AuthPage
              type="login"
              title={
                <Title
                  collapsed={false}
                  wrapperStyles={{
                    width: "300px",
                  }}
                />
              }
              registerLink=""
            />
          }
        />
        <Route
          path="/forgot-password"
          element={
            <AuthPage
              type="forgotPassword"
              title={
                <Title
                  collapsed={false}
                  wrapperStyles={{
                    width: "300px",
                  }}
                />
              }
            />
          }
        />
        <Route
          path="/update-password"
          element={<AuthPage type="updatePassword" />}
        />
      </Route>

      <Route
        element={
          <Authenticated key="catch-all" v3LegacyAuthProviderCompatible>
            <ThemedLayoutV2>
              <Outlet />
            </ThemedLayoutV2>
          </Authenticated>
        }
      >
        <Route path="*" element={<ErrorComponent />} />
      </Route>
    </ReactRoutes>
  );
};

export default Routes;

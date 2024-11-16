import { Authenticated } from "@refinedev/core";
import { ErrorComponent } from "pages/error-component";
import {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router-v6";
import { Outlet, Route, Routes as ReactRoutes } from "react-router-dom";

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
import {
  LeaveRequestCreate,
  LeaveRequestShow,
  TimesheetWrapper,
} from "@/pages/timesheet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Routes = () => {
  return (
    <ReactRoutes>
      <Route
        element={
          <Authenticated
            key="authenticated-routes"
            fallback={<CatchAllNavigate to="/login" />}
            v3LegacyAuthProviderCompatible={true}
          >
            <Layout>
              <Outlet />
              <ToastContainer />
            </Layout>
          </Authenticated>
        }
      >
        <Route index element={<TimesheetTablePage />} />

        <Route
          path="/timesheets"
          element={
            <TimesheetWrapper>
              <Outlet />
            </TimesheetWrapper>
          }
        >
          <Route index element={null} />
          <Route path="create-leave-request" element={<LeaveRequestCreate />} />
          <Route path="edit/:id" element={<EmployeeEdit />} />
          <Route path="show/:id" element={<LeaveRequestShow />} />
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
            v3LegacyAuthProviderCompatible={true}
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
          <Authenticated key="catch-all" v3LegacyAuthProviderCompatible={true}>
            <Layout>
              <Outlet />
            </Layout>
          </Authenticated>
        }
      >
        <Route path="*" element={<ErrorComponent />} />
      </Route>
    </ReactRoutes>
  );
};

export default Routes;

import { Refine, I18nProvider } from "@refinedev/core";
import { useNotificationProvider } from "@refinedev/antd";

import vi_VN from "antd/locale/vi_VN";

import { useTranslation } from "react-i18next";

import routerProvider, {
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter } from "react-router-dom";
import { App as AntdApp, ConfigProvider } from "antd";

import "@refinedev/antd/dist/reset.css";

import resources from "@/providers/routes/resources";
import React from "react";
import "./styles.css";
import Banner from "@/components/banner";
import authProvider from "@/providers/auth-provider";
import Routes from "@/providers/routes/Routes";
import dataProvider from "@/providers/data-provider";

const App: React.FC = () => {
  const { t, i18n } = useTranslation();

  const i18nProvider: I18nProvider = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      {import.meta.env.VITE_IS_TRIAL == "true" ? (
        <Banner
          text={"Hãy gửi mô tả lỗi về email: daoanhthanh.work@gmail.com"}
        />
      ) : (
        ""
      )}

      <ConfigProvider locale={vi_VN}>
        <AntdApp>
          <Refine
            authProvider={authProvider}
            dataProvider={dataProvider}
            routerProvider={routerProvider}
            resources={resources}
            i18nProvider={i18nProvider}
            notificationProvider={useNotificationProvider}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              textTransformers: {
                plural: (text) => text,
                singular: (text) => text,
              },
            }}
          >
            {Routes()}
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;

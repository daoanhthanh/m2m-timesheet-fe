import { initReactI18next } from "react-i18next";

import i18n from "i18next";

import vi from "@/locales/vi.json";

i18n.use(initReactI18next).init({
  resources: {
    vi: {
      translation: vi,
    },
  },
  lng: "vi", // if you're using a language detector, do not define the lng option
});

export default i18n;

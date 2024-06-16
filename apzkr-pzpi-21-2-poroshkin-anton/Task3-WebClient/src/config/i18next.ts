import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import en from "@/locales/en.json"
import ua from "@/locales/ua.json"

i18next.use(initReactI18next).use(LanguageDetector).init({
    fallbackLng: "ua",
    debug: true,
    resources: {
        en,
        ua,
    },
})


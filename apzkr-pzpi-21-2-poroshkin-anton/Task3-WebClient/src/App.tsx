import { App as AntdApp, ConfigProvider } from "antd"
import { Outlet } from "react-router-dom"
import ukUA from "antd/locale/uk_UA"
import enUS from "antd/locale/en_US"
import { Locale } from "@/types/locales/Locale"
import { useTranslation } from "react-i18next"

const locales = {
    [Locale.English]: enUS,
    [Locale.Ukrainian]: ukUA,
}

function App() {
    const { i18n } = useTranslation()

    return (
        <AntdApp style={{ height: "100%" }}>
            <ConfigProvider
                locale={locales[i18n.resolvedLanguage as Locale] || enUS}
            >
                <Outlet />
            </ConfigProvider>
        </AntdApp>
    )
}

export default App


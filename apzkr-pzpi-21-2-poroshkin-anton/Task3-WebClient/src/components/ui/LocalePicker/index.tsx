import { Locale } from "@/types/locales/Locale"
import { getEnumOptions } from "@/utils/getEnumOptions"
import { Select } from "antd"
import { useTranslation } from "react-i18next"

export default function LocalePicker() {
    const { t, i18n } = useTranslation()
    const languageOptions = getEnumOptions<Locale>(Locale, (label) => t(label))
    const selectedLanguage = i18n.resolvedLanguage as Locale

    function handleSelectLanguage(locale: Locale) {
        i18n.changeLanguage(locale)
    }

    return (
        <Select
            value={selectedLanguage}
            options={languageOptions}
            style={{ width: "120px" }}
            onChange={handleSelectLanguage}
        />
    )
}


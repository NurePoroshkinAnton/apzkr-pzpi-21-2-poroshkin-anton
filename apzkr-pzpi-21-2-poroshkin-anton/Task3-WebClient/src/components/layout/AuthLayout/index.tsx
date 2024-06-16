import { Typography } from "antd"
import { Outlet } from "react-router-dom"
import styles from "./styles.module.scss"
import { useTranslation } from "react-i18next"
import LocalePicker from "@/components/ui/LocalePicker"

export default function AuthLayout() {
    const { t } = useTranslation()

    return (
        <div className={styles["auth-layout"]}>
            <header className={styles["header"]}>
                <LocalePicker />
            </header>
            <div className={styles["content"]}>
                <Typography.Title>{t("welcome")}</Typography.Title>
                <Outlet />
            </div>
        </div>
    )
}


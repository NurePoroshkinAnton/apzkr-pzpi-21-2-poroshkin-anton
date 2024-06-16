import { Typography } from "antd"
import styles from "./styles.module.scss"
import SigninCompanyForm from "@/components/layout/company/auth/SigninCompany/SigninCompanyForm"
import { useTranslation } from "react-i18next"

export default function SinginCompany() {
    const { t } = useTranslation()

    return (
        <div className={styles["signin-company"]}>
            <Typography.Paragraph>{t("signinAsCompany")}</Typography.Paragraph>
            <SigninCompanyForm />
        </div>
    )
}


import { Typography } from "antd"
import styles from "./styles.module.scss"
import SignupCompanyForm from "@/components/layout/company/auth/SignupCompany/SignupCompanyForm"
import { useTranslation } from "react-i18next"

export default function SignupCompany() {
    const { t } = useTranslation()

    return (
        <div className={styles["signup-company"]}>
            <Typography.Paragraph>{t("signupAsCompany")}</Typography.Paragraph>
            <SignupCompanyForm />
        </div>
    )
}


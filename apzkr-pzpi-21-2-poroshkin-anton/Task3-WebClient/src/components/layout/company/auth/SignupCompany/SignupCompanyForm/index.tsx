import { SignupComapnyDto } from "@/types/auth/dto/SignupCompanyDto"
import { Button, Form, Input } from "antd"
import { useNavigate } from "react-router-dom"
import styles from "./styles.module.scss"
import { authStore } from "@/store/AuthStore"
import { useTranslation } from "react-i18next"

export default function SignupCompanyForm() {
    const { t } = useTranslation()
    const navigate = useNavigate()

    async function handleFormSubmit(values: SignupComapnyDto) {
        await authStore.signupCompany(values)
        navigate("/hotels")
    }

    return (
        <Form
            layout="vertical"
            onFinish={handleFormSubmit}
            className={styles["form"]}
        >
            <Form.Item label={t("companyName")} name="name">
                <Input />
            </Form.Item>
            <Form.Item label={t("email")} name="email">
                <Input type="email" />
            </Form.Item>
            <Form.Item label={t("password")} name="password">
                <Input.Password type="password" />
            </Form.Item>
            <Form.Item>
                <div className={styles["buttons-block"]}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={authStore.isLoading}
                    >
                        {t("signup")}
                    </Button>
                    <Button
                        type="default"
                        onClick={() => navigate("/auth/company/signin")}
                    >
                        {t("useExistingAccount")}
                    </Button>
                </div>
            </Form.Item>
        </Form>
    )
}


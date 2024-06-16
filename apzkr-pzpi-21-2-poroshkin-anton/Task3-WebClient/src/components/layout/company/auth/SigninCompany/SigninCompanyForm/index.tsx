import { SigninCompanyDto } from "@/types/auth/dto/SigninCompanyDto"
import { Button, Form, Input } from "antd"
import { useNavigate } from "react-router-dom"
import styles from "./styles.module.scss"
import { authStore } from "@/store/AuthStore"
import { useTranslation } from "react-i18next"

export default function SigninCompanyForm() {
    const { t } = useTranslation()
    const navigate = useNavigate()

    async function handleFormSubmit(values: SigninCompanyDto) {
        await authStore.signinCompany(values)
        navigate("/hotels")
    }

    return (
        <Form
            layout="vertical"
            onFinish={handleFormSubmit}
            className={styles["form"]}
        >
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
                        {t("signin")}
                    </Button>
                    <Button
                        type="default"
                        onClick={() => navigate("/auth/company/signup")}
                    >
                        {t("createNewAccount")}
                    </Button>
                </div>
            </Form.Item>
        </Form>
    )
}


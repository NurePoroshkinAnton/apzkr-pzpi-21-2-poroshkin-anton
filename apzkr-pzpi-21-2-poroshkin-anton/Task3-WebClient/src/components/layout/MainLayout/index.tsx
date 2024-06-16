import { Link, Outlet } from "react-router-dom"
import styles from "./styles.module.scss"
import { Button } from "antd"
import { authStore } from "@/store/AuthStore"
import { observer } from "mobx-react-lite"
import LocalePicker from "@/components/ui/LocalePicker"
import { useTranslation } from "react-i18next"

function MainLayoutComponent() {
    const { t } = useTranslation()

    return (
        <div className={styles["main-layout"]}>
            <header>
                <div className={styles["logo"]}>Climatly</div>
                <nav className={styles["navigation"]}>
                    <ul className={styles["navigation-list"]}>
                        <li>
                            <Link to={"/hotels"}>{t("hotels")}</Link>
                        </li>
                        <li>
                            <Link to={"/clients"}>{t("clients")}</Link>
                        </li>
                        <li>
                            <Link to={"/stats"}>{t("statistics")}</Link>
                        </li>
                    </ul>
                </nav>
                <LocalePicker />
                <div>{authStore.company?.name || authStore.client?.name}</div>
                <Button onClick={() => authStore.signout()}>
                    {t("signout")}
                </Button>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

const MainLayout = observer(MainLayoutComponent)
export default MainLayout


import PageTitle from "@/components/ui/PageTitle"
import styles from "./styles.module.scss"
import { useEffect, useState } from "react"
import { Button, Spin } from "antd"
import { observer } from "mobx-react-lite"
import { PlusOutlined } from "@ant-design/icons"
import { clientStore } from "@/store/ClientStore"
import ClientList from "@/components/layout/company/clients/ClientsList"
import CreateClientModal from "@/components/layout/company/clients/CreateClientModal"
import { useTranslation } from "react-i18next"

function ClientsComponent() {
    const { t } = useTranslation()
    const [isCreateModalVisible, setCreateModalVisible] =
        useState<boolean>(false)
    const { isLoading, isReady } = clientStore

    useEffect(() => {
        if (!isReady) {
            clientStore.fetchAll()
        }
    }, [isReady])

    if (isLoading) {
        return <Spin spinning fullscreen size="large" />
    }

    return (
        <div className={styles["rooms-page"]}>
            <CreateClientModal
                open={isCreateModalVisible}
                setOpen={(value) => setCreateModalVisible(value)}
            />
            <div className={styles["title-wrapper"]}>
                <PageTitle title={t("clients")} />
                <Button
                    shape="circle"
                    onClick={() => setCreateModalVisible(true)}
                >
                    <PlusOutlined />
                </Button>
            </div>
            <ClientList />
        </div>
    )
}

const Clients = observer(ClientsComponent)
export default Clients


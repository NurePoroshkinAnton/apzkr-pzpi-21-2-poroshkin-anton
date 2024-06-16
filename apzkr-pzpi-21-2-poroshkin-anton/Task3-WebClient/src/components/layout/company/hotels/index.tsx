import PageTitle from "@/components/ui/PageTitle"
import styles from "./styles.module.scss"
import HotelsList from "@/components/layout/company/hotels/HotelsList"
import { useEffect, useState } from "react"
import { hotelStore } from "@/store/HotelStore"
import { Button, Spin } from "antd"
import { observer } from "mobx-react-lite"
import CreateHotelModal from "@/components/layout/company/hotels/CreateHotelModal"
import { PlusOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"

function HotelsComponent() {
    const { t } = useTranslation()
    const [isCreateModalVisible, setCreateModalVisible] =
        useState<boolean>(false)
    const { isLoading, isReady } = hotelStore

    useEffect(() => {
        if (!isReady) {
            hotelStore.fetchAll()
        }
    }, [isReady])

    if (isLoading) {
        return <Spin spinning fullscreen size="large" />
    }

    return (
        <div className={styles["hotels-page"]}>
            <CreateHotelModal
                open={isCreateModalVisible}
                setOpen={(value) => setCreateModalVisible(value)}
            />
            <div className={styles["title-wrapper"]}>
                <PageTitle title={t("hotels")} />
                <Button
                    shape="circle"
                    onClick={() => setCreateModalVisible(true)}
                >
                    <PlusOutlined />
                </Button>
            </div>
            <HotelsList />
        </div>
    )
}

const Hotels = observer(HotelsComponent)
export default Hotels


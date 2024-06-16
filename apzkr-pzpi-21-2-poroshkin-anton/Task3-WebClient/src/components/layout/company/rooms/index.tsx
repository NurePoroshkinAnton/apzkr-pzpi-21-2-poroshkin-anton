import PageTitle from "@/components/ui/PageTitle"
import styles from "./styles.module.scss"
import { useEffect, useState } from "react"
import { Button, Spin } from "antd"
import { observer } from "mobx-react-lite"
import { PlusOutlined } from "@ant-design/icons"
import { roomStore } from "@/store/RoomStore"
import CreateRoomModal from "@/components/layout/company/rooms/CreateRoomModal"
import RoomList from "@/components/layout/company/rooms/RoomsList"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom"

function RoomsComponent() {
    const { t } = useTranslation()
    const [isCreateModalVisible, setCreateModalVisible] =
        useState<boolean>(false)
    const { isLoading, isReady } = roomStore
    const [searchParams] = useSearchParams()

    useEffect(() => {
        const hotelId = searchParams.get("hotelId")
        console.log(hotelId)
        roomStore.setHotelId(hotelId!)

        if (!isReady) {
            roomStore.fetchAll()
        }
    }, [isReady, searchParams])

    if (isLoading) {
        return <Spin spinning fullscreen size="large" />
    }

    return (
        <div className={styles["rooms-page"]}>
            <CreateRoomModal
                open={isCreateModalVisible}
                setOpen={(value) => setCreateModalVisible(value)}
            />
            <div className={styles["title-wrapper"]}>
                <PageTitle title={t("rooms")} />
                <Button
                    shape="circle"
                    onClick={() => setCreateModalVisible(true)}
                >
                    <PlusOutlined />
                </Button>
            </div>
            <RoomList />
        </div>
    )
}

const Rooms = observer(RoomsComponent)
export default Rooms


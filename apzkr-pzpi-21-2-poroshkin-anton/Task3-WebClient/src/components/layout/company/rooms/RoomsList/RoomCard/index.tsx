import { Button, Card } from "antd"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { useState } from "react"
import { Room } from "@/types/rooms/entities/Room"
import EditRoomModal from "@/components/layout/company/rooms/RoomsList/EditRoomModal"
import styles from "./styles.module.scss"
import { roomStore } from "@/store/RoomStore"
import { useTranslation } from "react-i18next"

type RoomCardProps = {
    room: Room
}

export default function RoomCard({ room }: RoomCardProps) {
    const { t } = useTranslation()
    const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false)

    return (
        <>
            <EditRoomModal
                open={isEditModalVisible}
                setOpen={setEditModalVisible}
                roomId={room.id}
                hotel={room.hotel}
            />
            <Card
                className={styles["room-card"]}
                title={room.number}
                actions={[
                    <Button
                        key="edit"
                        onClick={() => setEditModalVisible(true)}
                    >
                        <EditOutlined />
                    </Button>,
                    <Button
                        key="delete"
                        onClick={() => roomStore.delete(room.id)}
                    >
                        <DeleteOutlined />
                    </Button>,
                ]}
            >
                <div>
                    {t("numberOfClimateDevices")}: {room.climateDevices.length}
                </div>
                <div>
                    <Link
                        to={`/climate-devices?${new URLSearchParams({
                            roomId: room.id,
                            hotelId: room.hotel.id,
                        })}`}
                    >
                        {t("viewClimateDevices")}
                    </Link>
                </div>
            </Card>
        </>
    )
}


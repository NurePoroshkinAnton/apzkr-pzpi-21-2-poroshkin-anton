import { Hotel } from "@/types/hotels/entities/Hotel"
import { Button, Card } from "antd"
import styles from "./styles.module.scss"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { useState } from "react"
import EditHotelModal from "@/components/layout/company/hotels/HotelsList/EditHotelModal"
import { hotelStore } from "@/store/HotelStore"
import { useTranslation } from "react-i18next"

type HotelCardProps = {
    hotel: Hotel
}

export default function HotelCard({ hotel }: HotelCardProps) {
    const { t } = useTranslation()
    const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false)

    return (
        <>
            <EditHotelModal
                open={isEditModalVisible}
                setOpen={setEditModalVisible}
                hotelId={hotel.id}
            />
            <Card
                className={styles["hotel-card"]}
                title={hotel.name}
                actions={[
                    <Button
                        key="edit"
                        onClick={() => setEditModalVisible(true)}
                    >
                        <EditOutlined />
                    </Button>,
                    <Button
                        key="delete"
                        onClick={() => hotelStore.delete(hotel.id)}
                    >
                        <DeleteOutlined />
                    </Button>,
                ]}
            >
                <div>
                    {t("address")}: {hotel.address}
                </div>
                <div>
                    {t("numberOfRooms")}: {hotel.rooms.length}
                </div>
                <Link to={`/rooms?hotelId=${hotel.id}`}>{t("viewRooms")}</Link>
            </Card>
        </>
    )
}


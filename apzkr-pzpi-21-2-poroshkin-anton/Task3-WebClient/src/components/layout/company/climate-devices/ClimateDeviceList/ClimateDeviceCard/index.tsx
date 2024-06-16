import { Button, Card } from "antd"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { useState } from "react"
import styles from "./styles.module.scss"
import { ClimateDevice } from "@/types/climate-devices/entities/ClimateDevice"
import EditClimateDeviceModal from "@/components/layout/company/climate-devices/ClimateDeviceList/EditClimateDeviceModal"
import { climateDeviceStore } from "@/store/ClimateDeviceStore"
import { useTranslation } from "react-i18next"

type ClimateDeviceCardProps = {
    climateDevice: ClimateDevice
}

export default function ClimateDeviceCard({
    climateDevice,
}: ClimateDeviceCardProps) {
    const { t } = useTranslation()
    const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false)

    return (
        <>
            <EditClimateDeviceModal
                open={isEditModalVisible}
                setOpen={setEditModalVisible}
                climateDeviceId={climateDevice.id}
                room={climateDevice.room}
                deviceType={climateDevice.type}
            />
            <Card
                className={styles["room-card"]}
                title={`${t(climateDevice.type)} ${
                    climateDevice.accessionNumber
                }`}
                actions={[
                    <Button
                        key="edit"
                        onClick={() => setEditModalVisible(true)}
                    >
                        <EditOutlined />
                    </Button>,
                    <Button
                        key="delete"
                        onClick={() =>
                            climateDeviceStore.delete(climateDevice.id)
                        }
                    >
                        <DeleteOutlined />
                    </Button>,
                ]}
            >
                <div>
                    {t("manufacturer")}: {climateDevice.manufacturer}
                </div>
                <div>
                    {t("type")}: {t(climateDevice.type)}
                </div>
                <div>
                    {t("status")}: {t(climateDevice.status)}
                </div>
                <div>
                    {t("networkAddress")}: {climateDevice.address}
                </div>
            </Card>
        </>
    )
}


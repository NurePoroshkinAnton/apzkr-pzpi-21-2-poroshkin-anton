import { roomApi } from "@/api/RoomApi"
import { climateDeviceStore } from "@/store/ClimateDeviceStore"
import { CreateClimateDeviceDto } from "@/types/climate-devices/dto/CreateClimateDeviceDto"
import { ClimateDeviceType } from "@/types/climate-devices/entities/ClimateDevice"
import { Room } from "@/types/rooms/entities/Room"
import { getEnumOptions } from "@/utils/getEnumOptions"
import { Form, Input, Modal, ModalProps, Select, Spin } from "antd"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom"

type CreateClimateDeviceModalProps = ModalProps & {
    setOpen: (value: boolean) => void
}

export default function CreateClimateDeviceModal({
    setOpen,
    ...modalProps
}: CreateClimateDeviceModalProps) {
    const { t } = useTranslation()
    const [searchParams] = useSearchParams()
    const [form] = Form.useForm()
    const [rooms, setRooms] = useState<Room[]>([])

    useEffect(() => {
        const hotelId = searchParams.get("hotelId")
        roomApi.getAll(hotelId!).then(setRooms)
    }, [searchParams])

    const roomOptions = rooms.map((room) => ({
        value: room.id,
        label: room.number,
    }))

    const typeOptions = getEnumOptions<ClimateDeviceType>(
        ClimateDeviceType,
        (label) => t(label)
    )

    async function handleFormSubmit(values: CreateClimateDeviceDto) {
        await climateDeviceStore.create(values)
        setOpen(false)
    }

    return (
        <Modal
            {...modalProps}
            onCancel={() => setOpen(false)}
            onOk={() => form.submit()}
            title={t("addClimateDevice")}
            centered
        >
            <Spin spinning={!rooms}>
                <Form<CreateClimateDeviceDto>
                    layout="vertical"
                    onFinish={handleFormSubmit}
                    form={form}
                >
                    <Form.Item name="roomId" label={t("room")}>
                        <Select options={roomOptions} />
                    </Form.Item>
                    <Form.Item name="type" label={t("deviceType")}>
                        <Select options={typeOptions} />
                    </Form.Item>
                    <Form.Item name="address" label={t("localNetworkAddress")}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="accessionNumber"
                        label={t("accessionNumber")}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="manufacturer" label={t("manufacturer")}>
                        <Input />
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    )
}


import { hotelApi } from "@/api/HotelApi"
import { roomStore } from "@/store/RoomStore"
import { Hotel } from "@/types/hotels/entities/Hotel"
import { CreateRoomDto } from "@/types/rooms/dto/CreateRoomDto"
import { Form, Input, Modal, ModalProps, Select, Spin } from "antd"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom"

type EditRoomModalProps = ModalProps & {
    setOpen: (value: boolean) => void
}

export default function CreateRoomModal({
    setOpen,
    ...modalProps
}: EditRoomModalProps) {
    const { t } = useTranslation()
    const [searchParams] = useSearchParams()
    const [form] = Form.useForm()
    const [hotels, setHotels] = useState<Hotel[]>([])

    useEffect(() => {
        hotelApi.getAll().then(setHotels)
    }, [searchParams])

    const hotelsOptions = hotels.map((hotel) => ({
        value: hotel.id,
        label: hotel.name,
    }))

    async function handleFormSubmit(values: CreateRoomDto) {
        await roomStore.create(values)
        setOpen(false)
    }

    return (
        <Modal
            {...modalProps}
            onCancel={() => setOpen(false)}
            onOk={() => form.submit()}
            title={t("addRoom")}
            centered
        >
            <Spin spinning={!hotels}>
                <Form<CreateRoomDto>
                    layout="vertical"
                    onFinish={handleFormSubmit}
                    form={form}
                >
                    <Form.Item name="hotelId" label={t("hotel")}>
                        <Select options={hotelsOptions} />
                    </Form.Item>
                    <Form.Item name="number" label={t("number")}>
                        <Input type="number" />
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    )
}


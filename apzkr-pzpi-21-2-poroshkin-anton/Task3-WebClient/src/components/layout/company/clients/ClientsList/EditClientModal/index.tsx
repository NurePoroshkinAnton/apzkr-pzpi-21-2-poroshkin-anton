import { clientApi } from "@/api/ClientApi"
import { hotelApi } from "@/api/HotelApi"
import { roomApi } from "@/api/RoomApi"
import { clientStore } from "@/store/ClientStore"
import { UpdateClientDto } from "@/types/clients/dto/UpdateClientDto"
import { Hotel } from "@/types/hotels/entities/Hotel"
import { Room } from "@/types/rooms/entities/Room"
import { DeleteOutlined } from "@ant-design/icons"
import { Button, Form, Input, Modal, ModalProps, Select, Spin } from "antd"
import { useEffect, useState } from "react"
import { omit } from "lodash"
import { Client } from "@/types/clients/entities/Client"
import { useTranslation } from "react-i18next"

type EditClientModalProps = ModalProps & {
    setOpen: (value: boolean) => void
    clientId: string
}

export default function EditClientModal({
    clientId,
    setOpen,
    ...modalProps
}: EditClientModalProps) {
    const { t } = useTranslation()
    const [form] = Form.useForm()
    const [formValues, setFormValues] = useState<Client | null>(null)
    const [hotels, setHotels] = useState<Hotel[]>([])
    const [rooms, setRooms] = useState<Room[]>([])
    const [isLoadingRooms, setLoadingRooms] = useState<boolean>(false)
    const selectedHotelId = Form.useWatch("hotelId", form)
    const selectedRoomId = Form.useWatch("roomId", form)
    const selectedHotel = hotels.find((hotel) => hotel.id === selectedHotelId)

    function handleUnsetRoom() {
        form.setFieldValue("hotelId", undefined)
        form.setFieldValue("roomId", undefined)
    }

    async function handleFormSubmit(values: UpdateClientDto) {
        const dto = omit(values, ["hotelId"])

        if (values.roomId === undefined) {
            dto.roomId = null as unknown as undefined
        }

        await clientStore.update(clientId, dto)
        setOpen(false)
    }

    useEffect(() => {
        if (!modalProps.open) {
            return
        }

        clientApi.getById(clientId).then((values) => {
            setFormValues(values)
            form.setFieldsValue(values)
        })
    }, [form, clientId, modalProps.open])

    useEffect(() => {
        hotelApi.getAll().then(setHotels)
    }, [modalProps.open])

    useEffect(() => {
        if (selectedHotelId) {
            if (!selectedHotel) {
                return
            }

            setLoadingRooms(true)

            roomApi.getAll(selectedHotel.id).then((rooms) => {
                setRooms(rooms)
                setLoadingRooms(false)
            })
        }
    }, [selectedHotelId, hotels, selectedHotel])

    const hotelsOptions = hotels.map((hotel) => ({
        value: hotel.id,
        label: hotel.name,
    }))

    let roomsOptions = rooms.map((room) => ({
        value: room.id,
        label: room.number,
    }))

    if (roomsOptions.length === 0 && formValues?.room && formValues.roomId) {
        roomsOptions = [
            {
                value: formValues?.roomId,
                label: formValues?.room.number,
            },
        ]
    }

    return (
        <Modal
            {...modalProps}
            onCancel={() => setOpen(false)}
            onOk={() => form.submit()}
            title={t("editClient")}
            centered
        >
            <Spin spinning={!formValues || !hotels || isLoadingRooms}>
                <Form<UpdateClientDto>
                    layout="vertical"
                    onFinish={handleFormSubmit}
                    form={form}
                >
                    <Form.Item name="name" label={t("clientName")}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label={t("email")}>
                        <Input type="email" />
                    </Form.Item>
                    <Form.Item name="hotelId" label={t("hotel")}>
                        <Select options={hotelsOptions} />
                    </Form.Item>
                    <Form.Item label={t("room")}>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr auto",
                                gap: "8px",
                            }}
                        >
                            <Form.Item name="roomId" noStyle>
                                <Select
                                    options={roomsOptions}
                                    disabled={!selectedHotelId}
                                />
                            </Form.Item>
                            <Button
                                disabled={!selectedRoomId}
                                onClick={handleUnsetRoom}
                            >
                                <DeleteOutlined />
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    )
}


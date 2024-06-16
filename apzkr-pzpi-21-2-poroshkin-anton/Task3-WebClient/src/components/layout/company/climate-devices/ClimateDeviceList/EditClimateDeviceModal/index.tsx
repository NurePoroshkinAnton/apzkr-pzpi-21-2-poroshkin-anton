import { cliamteDeviceApi } from "@/api/ClimateDeviceApi"
import { climateDeviceStore } from "@/store/ClimateDeviceStore"
import { UpdateClimateDeviceDto } from "@/types/climate-devices/dto/UpdateClimateDeviceDto"
import { ClimateDeviceType } from "@/types/climate-devices/entities/ClimateDevice"
import { Room } from "@/types/rooms/entities/Room"
import { Form, Input, Modal, ModalProps, Select, Spin } from "antd"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

type EditClimateDeviceModalProps = ModalProps & {
    setOpen: (value: boolean) => void
    climateDeviceId: string
    room: Room
    deviceType: ClimateDeviceType
}

export default function EditClimateDeviceModal({
    climateDeviceId,
    setOpen,
    room,
    deviceType,
    ...modalProps
}: EditClimateDeviceModalProps) {
    const { t } = useTranslation()
    const [form] = Form.useForm()
    const [formValues, setFormValues] = useState<UpdateClimateDeviceDto | null>(
        null
    )

    useEffect(() => {
        if (!modalProps.open) {
            return
        }

        cliamteDeviceApi.getById(climateDeviceId).then((values) => {
            setFormValues(values)
            form.setFieldsValue(values)
        })
    }, [form, climateDeviceId, modalProps.open])

    async function handleFormSubmit(values: UpdateClimateDeviceDto) {
        await climateDeviceStore.update(climateDeviceId, values)
        setOpen(false)
    }

    return (
        <Modal
            {...modalProps}
            onCancel={() => setOpen(false)}
            onOk={() => form.submit()}
            title={t("editClimateDevice")}
            centered
        >
            <Spin spinning={!formValues}>
                <Form<UpdateClimateDeviceDto>
                    form={form}
                    layout="vertical"
                    onFinish={handleFormSubmit}
                    initialValues={{
                        roomId: room.id,
                        type: deviceType,
                    }}
                >
                    <Form.Item name="roomId" label={t("room")}>
                        <Select
                            options={[{ value: room.id, label: room.number }]}
                            disabled
                        />
                    </Form.Item>
                    <Form.Item name="type" label={t("type")}>
                        <Select
                            options={[
                                {
                                    value: deviceType,
                                    label: t(deviceType),
                                },
                            ]}
                            disabled
                        />
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


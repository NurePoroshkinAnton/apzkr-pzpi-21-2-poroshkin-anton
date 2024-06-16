import { hotelStore } from "@/store/HotelStore"
import { CreateHotelDto } from "@/types/hotels/dto/CreateHotelDto"
import { Form, Input, Modal, ModalProps } from "antd"
import { useTranslation } from "react-i18next"

type EditHotelModalProps = ModalProps & {
    setOpen: (value: boolean) => void
}

export default function CreateHotelModal({
    setOpen,
    ...modalProps
}: EditHotelModalProps) {
    const { t } = useTranslation()
    const [form] = Form.useForm()

    async function handleFormSubmit(values: CreateHotelDto) {
        await hotelStore.create(values)
        setOpen(false)
    }

    return (
        <Modal
            {...modalProps}
            onCancel={() => setOpen(false)}
            onOk={() => form.submit()}
            title={t("addHotel")}
            centered
        >
            <Form<CreateHotelDto>
                layout="vertical"
                onFinish={handleFormSubmit}
                form={form}
            >
                <Form.Item name="name" label={t("name")}>
                    <Input />
                </Form.Item>
                <Form.Item name="address" label={t("address")}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}


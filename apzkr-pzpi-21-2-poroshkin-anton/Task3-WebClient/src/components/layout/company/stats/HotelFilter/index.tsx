import { hotelApi } from "@/api/HotelApi"
import { Hotel } from "@/types/hotels/entities/Hotel"
import { Select } from "antd"
import { useEffect, useState } from "react"
import styles from "./styles.module.scss"
import { useTranslation } from "react-i18next"

type HotelFilterProps = {
    setSelectedHotelId: (value: string) => void
}

export default function HotelFilter({ setSelectedHotelId }: HotelFilterProps) {
    const { t } = useTranslation()
    const [hotels, setHotes] = useState<Hotel[]>([])

    useEffect(() => {
        hotelApi.getAll().then(setHotes)
    }, [])

    const hotelOptions = hotels.map((hotel) => ({
        label: hotel.name,
        value: hotel.id,
    }))

    hotelOptions.unshift({ value: "", label: t("notSelected") })

    return (
        <div className={styles["hotel-filter"]}>
            {t("filterByHotel")}:{" "}
            <Select
                options={hotelOptions}
                onChange={(hotelId) => setSelectedHotelId(hotelId)}
                defaultValue=""
            />
        </div>
    )
}


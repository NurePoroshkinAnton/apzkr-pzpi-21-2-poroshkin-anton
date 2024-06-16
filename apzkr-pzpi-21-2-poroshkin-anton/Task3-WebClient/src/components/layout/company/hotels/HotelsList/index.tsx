import HotelCard from "@/components/layout/company/hotels/HotelsList/HotelCard"
import styles from "./styles.module.scss"
import { hotelStore } from "@/store/HotelStore"
import { observer } from "mobx-react-lite"

function HotelsListComponent() {
    const hotels = hotelStore.hotels

    return (
        <div className={styles["hotels-list"]}>
            {hotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
            ))}
        </div>
    )
}

const HotelsList = observer(HotelsListComponent)
export default HotelsList


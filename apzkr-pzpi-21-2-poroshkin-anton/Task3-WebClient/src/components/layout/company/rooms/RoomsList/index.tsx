import styles from "./styles.module.scss"
import { observer } from "mobx-react-lite"
import { roomStore } from "@/store/RoomStore"
import RoomCard from "@/components/layout/company/rooms/RoomsList/RoomCard"

function RoomListComponent() {
    const rooms = roomStore.rooms

    return (
        <div className={styles["rooms-list"]}>
            {rooms.map((room) => (
                <RoomCard key={room.id} room={room} />
            ))}
        </div>
    )
}

const RoomList = observer(RoomListComponent)
export default RoomList


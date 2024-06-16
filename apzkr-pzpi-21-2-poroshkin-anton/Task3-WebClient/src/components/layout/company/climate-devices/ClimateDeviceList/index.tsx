import styles from "./styles.module.scss"
import { observer } from "mobx-react-lite"
import { climateDeviceStore } from "@/store/ClimateDeviceStore"
import ClimateDeviceCard from "@/components/layout/company/climate-devices/ClimateDeviceList/ClimateDeviceCard"

function ClimateDeviceListComponent() {
    const climateDevices = climateDeviceStore.climateDevices

    return (
        <div className={styles["rooms-list"]}>
            {climateDevices.map((climateDevice) => (
                <ClimateDeviceCard
                    key={climateDevice.id}
                    climateDevice={climateDevice}
                />
            ))}
        </div>
    )
}

const ClimateDeviceList = observer(ClimateDeviceListComponent)
export default ClimateDeviceList


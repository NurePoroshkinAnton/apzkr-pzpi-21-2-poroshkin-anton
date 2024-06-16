import styles from "./styles.module.scss"
import { observer } from "mobx-react-lite"
import { clientStore } from "@/store/ClientStore"
import ClientCard from "@/components/layout/company/clients/ClientsList/ClientCard"

function ClientListComponent() {
    const clients = clientStore.clients

    return (
        <div className={styles["rooms-list"]}>
            {clients.map((client) => (
                <ClientCard key={client.id} client={client} />
            ))}
        </div>
    )
}

const ClientList = observer(ClientListComponent)
export default ClientList


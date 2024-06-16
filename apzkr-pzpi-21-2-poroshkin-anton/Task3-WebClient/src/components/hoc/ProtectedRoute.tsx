import { Spin } from "antd"
import { observer } from "mobx-react-lite"
import { Navigate } from "react-router-dom"
import { authStore } from "@/store/AuthStore"
import { useEffect } from "react"
import { ACCESS_TOKEN_LS_KEY } from "@/config/constants"
import { jwtDecode } from "jwt-decode"
import { JwtPayload } from "@/types/common/JwtPayload"
import { Role } from "@/types/common/Role"

function ProtectedRouteComponent({ children }: { children: JSX.Element }) {
    useEffect(() => {
        if (!authStore.isReady) {
            const accessToken = localStorage.getItem(ACCESS_TOKEN_LS_KEY)

            if (!accessToken) {
                authStore.setReady(true)
                return
            }

            const tokenPayload = jwtDecode<JwtPayload>(accessToken)

            if (tokenPayload.role === Role.Company) {
                authStore.getCompanyProfile()
            }
        }
    })

    if (!authStore.isReady) {
        return <Spin spinning size="large" />
    }

    if (!authStore.company) {
        console.log(!authStore.client)
        console.log(!authStore.company)
        return <Navigate to="/auth/company/signin" replace />
    }

    return children
}

const ProtectedRoute = observer(ProtectedRouteComponent)
export default ProtectedRoute


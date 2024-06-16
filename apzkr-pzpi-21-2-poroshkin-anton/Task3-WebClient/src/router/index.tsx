import App from "@/App"
import { createBrowserRouter } from "react-router-dom"
import MainLayout from "@/components/layout/MainLayout"
import AuthLayout from "@/components/layout/AuthLayout"
import SinginCompany from "@/components/layout/company/auth/SigninCompany"
import SignupCompany from "@/components/layout/company/auth/SignupCompany"
import ProtectedRoute from "@/components/hoc/ProtectedRoute"
import Hotels from "@/components/layout/company/hotels"
import Rooms from "@/components/layout/company/rooms"
import ClimateDevices from "@/components/layout/company/climate-devices"
import Clients from "@/components/layout/company/clients"
import Stats from "@/components/layout/company/stats"

export const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: "/",
                element: <MainLayout />,
                children: [
                    {
                        path: "hotels",
                        element: (
                            <ProtectedRoute>
                                <Hotels />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "rooms",
                        element: (
                            <ProtectedRoute>
                                <Rooms />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "climate-devices",
                        element: (
                            <ProtectedRoute>
                                <ClimateDevices />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "clients",
                        element: (
                            <ProtectedRoute>
                                <Clients />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "stats",
                        element: (
                            <ProtectedRoute>
                                <Stats />
                            </ProtectedRoute>
                        ),
                    },
                ],
            },
            {
                path: "/auth",
                element: <AuthLayout />,
                children: [
                    {
                        path: "company/signin",
                        element: <SinginCompany />,
                    },
                    {
                        path: "company/signup",
                        element: <SignupCompany />,
                    },
                ],
            },
        ],
    },
])


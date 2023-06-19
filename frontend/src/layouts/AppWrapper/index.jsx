import { Outlet, ScrollRestoration } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";

export default function AppWrapper()
{

    return (
        <>
            <ScrollRestoration />
            <MainLayout>
                <Outlet />
            </MainLayout>
        </>
    );
};
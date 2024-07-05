import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function Root() {
    return (
        <div className="flex flex-col h-dvh max-h-dvh bg-base-200 text-base-content items-center">
            <Header />
            <div className="grow overflow-auto p-6 w-full max-w-sm">
                <Outlet />
            </div>
        </div>
    );
}

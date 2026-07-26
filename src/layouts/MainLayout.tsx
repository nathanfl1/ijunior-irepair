import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navigation from "../components/Navigation.tsx";

const MainLayout = () => {

    return (
        <div className="min-h-screen bg-gray-100">

            <Header />

            <Navigation />

            <main className="max-w-7xl mx-auto p-6">
                <Outlet />
            </main>

        </div>
    );

};

export default MainLayout;
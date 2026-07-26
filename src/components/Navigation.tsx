import { NavLink } from "react-router-dom";

const Navigation = () => {

    return (

        <nav className="bg-white shadow">

            <div className="max-w-7xl mx-auto flex gap-6 p-4">

                <NavLink
                    to="/clients"
                    className={({ isActive }) =>
                        isActive
                            ? "text-blue-600 font-bold"
                            : "text-gray-700 hover:text-blue-600"
                    }
                >
                    Clientes
                </NavLink>

                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "text-blue-600 font-bold"
                            : "text-gray-700 hover:text-blue-600"
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink to="/service-orders">
                    Ordens de Serviço
                </NavLink>
            </div>

        </nav>

    );

};

export default Navigation;
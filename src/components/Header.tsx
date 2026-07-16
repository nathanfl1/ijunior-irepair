function Header() {
    return (
        <header className="bg-blue-700 text-white shadow-md ">
            <div className="max-w-7xl mx-auto flex items-center justify-between p-6">

                <div>
                    <h1 className="text-4xl font-bold">
                        iRepair
                    </h1>

                    <p className="text-blue-100 mt-1">
                        Sistema de Gestão de Ordens de Serviço
                    </p>
                </div>

                <img
                    src="/simbolo_logo.webp"
                    alt="Logo iJunior"
                    className="h-16"
                />

            </div>
        </header>
    );
}

export default Header;
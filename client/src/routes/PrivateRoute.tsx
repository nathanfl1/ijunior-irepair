// src/routes/PrivateRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import type { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  // Puxando exatamente os nomes que estão no AuthContext
  const { isAuthenticated, isLoading } = useAuth();

  // Enquanto o useEffect do AuthContext busca o /auth/me, mostramos um loading
  // Isso evita que o usuário seja jogado pro /login antes de o React saber se ele tem o cookie
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Carregando...</p>
      </div>
    ); 
  }

  // Se a verificação terminou e ele não está autenticado, manda pro Login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se está tudo certo, renderiza o conteúdo protegido (MainLayout)
  return <>{children}</>;
}
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router'
import { AuthProvider } from './contexts/AuthContext'
import { PrivateRoute } from './routes/PrivateRoute'
import  Login  from './pages/Login'
import  MainLayout  from './layouts/MainLayout'  // o layout que você já tem
import  Dashboard from './pages/Dashboard'
import  Clients from './pages/Clients'
import  ServiceOrders from './pages/ServiceOrders'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rota pública */}
          <Route path="/login" element={<Login />} />

          {/* Rotas protegidas — envolvem o layout já existente */}
          <Route element={<PrivateRoute> <Dashboard /></PrivateRoute>}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/service-orders" element={<ServiceOrders />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
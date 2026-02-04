import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Properties from './pages/Properties'
import PropertyDetail from './pages/PropertyDetail'
import CreateProperty from './pages/CreateProperty'
import EditProperty from './pages/EditProperty'
import NotFound from './pages/NotFound'
import AuthProvider from './context/AuthContext'

import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <AuthProvider>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />

            {/* Rutas Privadas */}
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/create"
              element={
                <PrivateRoute>
                  <CreateProperty />
                </PrivateRoute>
              }
            />
            <Route
              path="/properties/:id/edit"
              element={
                <PrivateRoute>
                  <EditProperty />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
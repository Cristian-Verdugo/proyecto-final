import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: ''
    })

    const { register } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await register(formData)
        if (result.success) {
            alert("Registro exitoso")
            navigate('/login')
        } else {
            alert(result.message)
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-white">
                        <h2 className="text-center mb-4">Registro</h2>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nombre"
                                name="nombre"
                                placeholder="Ingresa tu nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Ingresa tu email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Ingresa tu contraseña"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-dark w-100 mb-3">Registrarse</button>
                        <div className="text-center">
                            <Link to="/login" className="text-decoration-none text-secondary">¿Ya tienes cuenta? Inicia Sesión</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register

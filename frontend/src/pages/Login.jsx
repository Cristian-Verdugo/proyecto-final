import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Login = () => {
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (!formData.email || !formData.password) {
            setError("Todos los campos son obligatorios")
            return
        }

        if (formData.password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres")
            return
        }

        setIsSubmitting(true)
        const result = await login(formData.email, formData.password)
        setIsSubmitting(false)

        if (result.success) {
            alert("Inicio de sesión exitoso")
            navigate('/')
        } else {
            setError(result.message || 'Error al iniciar sesión')
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-white">
                        <h2 className="text-center mb-4">Iniciar Sesión</h2>

                        {error && <div className="alert alert-danger" role="alert">{error}</div>}

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
                            />
                        </div>
                        <button type="submit" className="btn btn-dark w-100 mb-3" disabled={isSubmitting}>
                            {isSubmitting ? 'Ingresando...' : 'Iniciar Sesión'}
                        </button>
                        <div className="text-center">
                            <Link to="/register" className="text-decoration-none text-secondary">¿No tienes cuenta? Regístrate</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
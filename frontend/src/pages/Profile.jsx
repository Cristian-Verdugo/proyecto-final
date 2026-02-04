import { useState, useEffect, useContext, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import api from '../config/axios'

const Profile = () => {
    const { user } = useContext(AuthContext)
    const [properties, setProperties] = useState([])
    const [inquiries, setInquiries] = useState([])
    const [inquiriesLoading, setInquiriesLoading] = useState(true)
    const [inquiriesError, setInquiriesError] = useState('')
    const [filterPropertyId, setFilterPropertyId] = useState('all')

    useEffect(() => {
        // Ideally fetch only user's properties, here fetching all as per current logic
        api.get('/properties')
            .then(res => setProperties(res.data))
            .catch(err => console.error(err))
    }, [])

    useEffect(() => {
        setInquiriesLoading(true)
        setInquiriesError('')
        api.get('/inquiries')
            .then(res => setInquiries(res.data))
            .catch(err => {
                console.error(err)
                setInquiriesError('No se pudieron cargar las solicitudes.')
            })
            .finally(() => setInquiriesLoading(false))
    }, [])

    const propertyTitleById = useMemo(() => {
        const map = new Map()
        properties.forEach(p => map.set(p.id, p.title))
        return map
    }, [properties])

    const filteredInquiries = useMemo(() => {
        if (filterPropertyId === 'all') return inquiries
        return inquiries.filter(i => String(i.property_id) === String(filterPropertyId))
    }, [inquiries, filterPropertyId])

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("¿Estas seguro de que deseas eliminar esta propiedad?")
        if (confirmDelete) {
            try {
                await api.delete(`/properties/${id}`)
                setProperties(properties.filter(p => p.id !== id))
                alert("Propiedad eliminada")
            } catch (error) {
                console.error("Error deleting property:", error)
                alert("Error al eliminar la propiedad")
            }
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <h1 className="mb-4 text-center">Mi Perfil</h1>

                    {/* Seccion de Datos del Usuario */}
                    <div className="card mb-5 shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title mb-4 border-bottom pb-2">Datos</h3>
                            <div className="mb-3">
                                <label className="fw-bold">Nombre:</label>
                                <p className="form-control-plaintext">{user?.name || "Usuario"}</p>
                            </div>
                            <div className="mb-3">
                                <label className="fw-bold">Correo electronico:</label>
                                <p className="form-control-plaintext">{user?.email || "invitado@ejemplo.com"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Seccion de Propiedades */}
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title mb-4 border-bottom pb-2">Propiedades</h3>

                            {properties.length > 0 ? (
                                <ul className="list-group list-group-flush mb-4">
                                    {properties.map(property => (
                                        <li key={property.id} className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <span className="fw-medium">{property.title}</span>
                                            <div className="btn-group mt-2 mt-sm-0">
                                                <Link to={`/properties/${property.id}/edit`} className="btn btn-outline-secondary btn-sm me-2">Editar</Link>
                                                <button
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() => handleDelete(property.id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted text-center my-4">No tienes propiedades publicadas.</p>
                            )}

                            <div className="text-center">
                                <Link to="/create" className="btn btn-dark">
                                    Crear Nueva Publicacion
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Seccion de Solicitudes */}
                    <div className="card shadow-sm mt-5">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                <h3 className="card-title mb-2 mb-md-0">Solicitudes de Contacto</h3>
                                <div className="d-flex align-items-center">
                                    <label htmlFor="filterProperty" className="me-2">Filtrar:</label>
                                    <select
                                        id="filterProperty"
                                        className="form-select form-select-sm"
                                        style={{ minWidth: '200px' }}
                                        value={filterPropertyId}
                                        onChange={(e) => setFilterPropertyId(e.target.value)}
                                    >
                                        <option value="all">Todas</option>
                                        {properties.map(p => (
                                            <option key={p.id} value={p.id}>{p.title}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {inquiriesLoading && (
                                <p className="text-muted text-center my-4">Cargando solicitudes...</p>
                            )}

                            {inquiriesError && (
                                <div className="alert alert-danger" role="alert">{inquiriesError}</div>
                            )}

                            {!inquiriesLoading && !inquiriesError && filteredInquiries.length > 0 ? (
                                <ul className="list-group list-group-flush">
                                    {filteredInquiries.map(inquiry => (
                                        <li key={inquiry.id} className="list-group-item">
                                            <div className="d-flex justify-content-between flex-wrap">
                                                <div>
                                                    <span className="fw-bold">{inquiry.name}</span>
                                                    <span className="text-muted ms-2">{inquiry.email}</span>
                                                </div>
                                                {inquiry.createdAt && (
                                                    <span className="text-muted small">
                                                        {new Date(inquiry.createdAt).toLocaleString()}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="mb-1 mt-2">{inquiry.message}</p>
                                            <small className="text-muted">
                                                Propiedad: {propertyTitleById.get(inquiry.property_id) || `ID ${inquiry.property_id}`}
                                            </small>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                !inquiriesLoading && !inquiriesError && (
                                    <p className="text-muted text-center my-4">No hay solicitudes de contacto.</p>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
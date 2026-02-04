import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../config/axios';
import { resolveImageUrl } from '../utils/image';

const PropertyDetail = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [contactForm, setContactForm] = useState({
        nombre: '',
        email: '',
        mensaje: ''
    });

    useEffect(() => {
        api.get(`/properties/${id}`)
            .then(response => {
                setProperty(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching property:", error);
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        setContactForm({ ...contactForm, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');
        setSubmitSuccess('');
        setIsSubmitting(true);

        try {
            await api.post('/inquiries', {
                name: contactForm.nombre,
                email: contactForm.email,
                message: contactForm.mensaje,
                property_id: Number(id)
            });
            setSubmitSuccess('Solicitud enviada correctamente. Te contactaremos pronto.');
            setContactForm({ nombre: '', email: '', mensaje: '' });
        } catch (error) {
            setSubmitError(error.response?.data?.message || 'Error al enviar la solicitud');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div className="text-center mt-5">Cargando...</div>;
    if (!property) return <div className="text-center mt-5">Propiedad no encontrada</div>;

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                {/* Detalles de la Propiedad */}
                <div className="col-md-8">
                    <div className="card shadow-sm mb-4">
                        <img
                            src={resolveImageUrl(property.image)}
                            className="card-img-top"
                            alt={property.title}
                            style={{ maxHeight: '400px', objectFit: 'cover' }}
                        />
                        <div className="card-body">
                            <h2 className="card-title fw-bold mb-3">{property.title}</h2>
                            <h4 className="card-text text-primary fw-bold mb-3">
                                ${property.price.toLocaleString('es-CL')}
                            </h4>

                            <hr />

                            <div className="row mb-3">
                                <div className="col-sm-6">
                                    <p><strong><i className="fas fa-map-marker-alt me-2"></i>Ubicación:</strong> {property.address}</p>
                                    <p><strong><i className="fas fa-home me-2"></i>Tipo:</strong> {property.type}</p>
                                </div>
                                <div className="col-sm-6">
                                    <p><strong><i className="fas fa-bed me-2"></i>Habitaciones:</strong> {property.rooms}</p>
                                    <p><strong><i className="fas fa-bath me-2"></i>Baños:</strong> {property.bathrooms}</p>
                                </div>
                            </div>

                            <p><strong><i className="fas fa-paw me-2"></i>Mascotas:</strong> {property.pets ? 'Sí, permitidas' : 'No permitidas'}</p>

                            <hr />

                            <h5 className="mb-3">Descripción</h5>
                            <p className="card-text text-muted">{property.description}</p>
                        </div>
                    </div>
                </div>

                {/* Formulario de Contacto */}
                <div className="col-md-4">
                    <div className="card shadow-sm sticky-top" style={{ top: '20px' }}>
                        <div className="card-body">
                            <h4 className="card-title text-center mb-4">Contactar</h4>
                            <form onSubmit={handleSubmit}>
                                {submitSuccess && <div className="alert alert-success" role="alert">{submitSuccess}</div>}
                                {submitError && <div className="alert alert-danger" role="alert">{submitError}</div>}
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nombre"
                                        name="nombre"
                                        value={contactForm.nombre}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={contactForm.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="mensaje" className="form-label">Mensaje</label>
                                    <textarea
                                        className="form-control"
                                        id="mensaje"
                                        name="mensaje"
                                        rows="4"
                                        value={contactForm.mensaje}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-dark w-100" disabled={isSubmitting}>
                                    {isSubmitting ? 'Enviando...' : 'Solicitar Información'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetail;

import { Link } from 'react-router-dom';
import { resolveImageUrl } from '../utils/image';

const PropertyCard = ({ property }) => {
    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
                {property.image &&
                    <img
                        src={resolveImageUrl(property.image)}
                        className="card-img-top"
                        alt={property.title}
                        style={{ height: '200px', objectFit: 'cover' }}
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400?text=No+Image'; }}
                    />
                }
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-truncate">{property.title}</h5>

                    <div className="mt-auto">
                        <p className="card-text mb-2 text-muted small">
                            {property.type && <span className="badge bg-secondary me-2">{property.type}</span>}
                            <i className="fas fa-map-marker-alt me-1"></i> {property.address}
                        </p>
                        <p className="card-text fw-bold fs-5 text-primary">
                            ${property.price.toLocaleString('es-CL')}
                        </p>
                        <Link to={`/properties/${property.id}`} className="btn btn-dark w-100 mt-2">
                            Ver Detalle
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;

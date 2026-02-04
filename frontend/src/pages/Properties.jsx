import { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import api from '../config/axios';
import { resolveImageUrl } from '../utils/image';

const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        api.get('/properties')
            .then(response => {
                const updatedData = response.data.map(item => ({
                    ...item,
                    image: resolveImageUrl(item.image)
                }));
                setProperties(updatedData);
            })
            .catch(error => {
                console.error("Error fetching properties:", error);
            });
    }, []);

    const filteredProperties = filter === 'All'
        ? properties
        : properties.filter(p => p.type === filter);

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Galería de Propiedades</h2>

            <div className="d-flex justify-content-center mb-4">
                <button
                    className={`btn me-2 ${filter === 'All' ? 'btn-dark' : 'btn-outline-dark'}`}
                    onClick={() => setFilter('All')}
                >
                    Todos
                </button>
                <button
                    className={`btn me-2 ${filter === 'Casa' ? 'btn-dark' : 'btn-outline-dark'}`}
                    onClick={() => setFilter('Casa')}
                >
                    Casas
                </button>
                <button
                    className={`btn ${filter === 'Departamento' ? 'btn-dark' : 'btn-outline-dark'}`}
                    onClick={() => setFilter('Departamento')}
                >
                    Departamentos
                </button>
            </div>

            <div className="row">
                {filteredProperties.length > 0 ? (
                    filteredProperties.map(property => (
                        <PropertyCard key={property.id} property={property} />
                    ))
                ) : (
                    <p className="text-center">Cargando propiedades...</p>
                )}
            </div>
        </div>
    );
};

export default Properties;

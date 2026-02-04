import { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import api from '../config/axios';
import { resolveImageUrl } from '../utils/image';

const Home = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        api.get('/properties')
            .then(response => {
                const updatedData = response.data.map(item => ({
                    ...item,
                    image: resolveImageUrl(item.image)
                }));
                setProperties(updatedData.slice(0, 3));
            })
            .catch(error => {
                console.error("Error fetching properties:", error);
            });
    }, []);

    return (
        <div>
            {/* Banner Section */}
            <section className="bg-light text-center py-5 mb-5" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container py-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px' }}>
                    <h1 className="display-4 fw-bold">Encuentra tu próximo hogar</h1>
                    <p className="lead">Explora las mejores propiedades en arriendo.</p>
                </div>
            </section>

            {/* Featured Properties Section */}
            <div className="container">
                <h2 className="text-center mb-4">Propiedades Destacadas</h2>
                <div className="row">
                    {properties.map(property => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;

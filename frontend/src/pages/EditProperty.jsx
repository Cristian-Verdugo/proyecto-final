import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../config/axios'
import PropertyForm from '../components/PropertyForm'

const EditProperty = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [initialData, setInitialData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        api.get(`/properties/${id}`)
            .then(res => {
                const p = res.data
                setInitialData({
                    title: p.title || '',
                    type: p.type || 'Departamento',
                    price: p.price ?? '',
                    address: p.address || '',
                    rooms: p.rooms ?? '',
                    bathrooms: p.bathrooms ?? '',
                    description: p.description || '',
                    pets: Boolean(p.pets),
                    smoking: Boolean(p.smoking),
                    image: p.image || ''
                })
                setLoading(false)
            })
            .catch(err => {
                console.error('Error fetching property:', err)
                setError('No se pudo cargar la propiedad')
                setLoading(false)
            })
    }, [id])

    const handleUpdate = async (data) => {
        setError('')
        setIsSubmitting(true)

        try {
            const formData = new FormData()
            formData.append('title', data.title)
            formData.append('type', data.type)
            formData.append('price', data.price)
            formData.append('address', data.address)
            formData.append('rooms', data.rooms)
            formData.append('bathrooms', data.bathrooms)
            formData.append('pets', data.pets)
            formData.append('smoking', data.smoking)
            formData.append('description', data.description)
            formData.append('image', data.image || '')
            if (data.imageFile) {
                formData.append('image', data.imageFile)
            }

            await api.put(`/properties/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            alert('Propiedad actualizada')
            navigate('/profile')
        } catch (err) {
            setError(err.response?.data?.message || 'Error al actualizar la propiedad')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (loading) return <div className="text-center mt-5">Cargando...</div>
    if (!initialData) return <div className="text-center mt-5">Propiedad no encontrada</div>

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Editar Propiedad</h2>
                            <PropertyForm
                                initialData={initialData}
                                onSubmit={handleUpdate}
                                submitLabel="Guardar Cambios"
                                isSubmitting={isSubmitting}
                                error={error}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProperty
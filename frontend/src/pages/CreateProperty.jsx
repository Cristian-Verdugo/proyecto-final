import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../config/axios'
import PropertyForm from '../components/PropertyForm'

const CreateProperty = () => {
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()

    const handleCreate = async (data) => {
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

            await api.post('/properties', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            alert("Propiedad publicada exitosamente")
            navigate('/profile')
        } catch (err) {
            setError(err.response?.data?.message || 'Error al publicar la propiedad')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Crear Publicación</h2>
                            <PropertyForm
                                onSubmit={handleCreate}
                                submitLabel="Publicar Propiedad"
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

export default CreateProperty
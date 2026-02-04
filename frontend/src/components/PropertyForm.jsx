import { useEffect, useState } from 'react'
import { resolveImageUrl } from '../utils/image'

const defaultValues = {
    title: '',
    type: 'Departamento',
    price: '',
    address: '',
    rooms: '',
    bathrooms: '',
    description: '',
    pets: false,
    smoking: false,
    image: '',
    imageFile: null
}

const PropertyForm = ({ initialData = null, onSubmit, submitLabel, isSubmitting, error }) => {
    const [formData, setFormData] = useState({ ...defaultValues, ...(initialData || {}) })
    const [previewUrl, setPreviewUrl] = useState('')

    useEffect(() => {
        if (!initialData) return
        setFormData({ ...defaultValues, ...initialData })
    }, [initialData])

    useEffect(() => {
        if (!formData.imageFile) {
            setPreviewUrl('')
            return
        }
        const objectUrl = URL.createObjectURL(formData.imageFile)
        setPreviewUrl(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [formData.imageFile])

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'file' ? (files && files[0] ? files[0] : null)
                : type === 'checkbox' ? checked
                    : type === 'radio' ? (value === 'true') : value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Título</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="type" className="form-label">Tipo de propiedad</label>
                    <select
                        className="form-select"
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                    >
                        <option value="Departamento">Departamento</option>
                        <option value="Casa">Casa</option>
                    </select>
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="price" className="form-label">Precio</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="0"
                    />
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="address" className="form-label">Dirección</label>
                <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="form-label">Descripción</label>
                <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="rooms" className="form-label">Habitaciones</label>
                    <input
                        type="number"
                        className="form-control"
                        id="rooms"
                        name="rooms"
                        value={formData.rooms}
                        onChange={handleChange}
                        required
                        min="0"
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="bathrooms" className="form-label">Baños</label>
                    <input
                        type="number"
                        className="form-control"
                        id="bathrooms"
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleChange}
                        required
                        min="0"
                    />
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label d-block">Permite mascotas</label>
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="pets"
                        id="petsYes"
                        value="true"
                        checked={formData.pets === true}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="petsYes">Sí</label>
                </div>
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="pets"
                        id="petsNo"
                        value="false"
                        checked={formData.pets === false}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="petsNo">No</label>
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label d-block">Permite fumar</label>
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="smoking"
                        id="smokingYes"
                        value="true"
                        checked={formData.smoking === true}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="smokingYes">Sí</label>
                </div>
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="smoking"
                        id="smokingNo"
                        value="false"
                        checked={formData.smoking === false}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="smokingNo">No</label>
                </div>
            </div>

            {(previewUrl || formData.image) && (
                <div className="mb-3">
                    <label className="form-label d-block">
                        {previewUrl ? 'Vista previa' : 'Imagen actual'}
                    </label>
                    <img
                        src={previewUrl || resolveImageUrl(formData.image)}
                        alt="Imagen de la propiedad"
                        className="img-fluid rounded border"
                    />
                </div>
            )}

            <div className="mb-4">
                <label htmlFor="imageFile" className="form-label">Imagen de la propiedad</label>
                <input
                    type="file"
                    className="form-control"
                    id="imageFile"
                    name="imageFile"
                    accept="image/*"
                    onChange={handleChange}
                />
                <div className="form-text">Si no seleccionas una nueva imagen, se mantiene la actual.</div>
            </div>

            <div className="d-grid">
                <button type="submit" className="btn btn-dark btn-lg" disabled={isSubmitting}>
                    {isSubmitting ? 'Guardando...' : submitLabel}
                </button>
            </div>
        </form>
    )
}

export default PropertyForm

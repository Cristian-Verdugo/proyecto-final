import { API_BASE_URL } from '../config/axios'

export const resolveImageUrl = (image) => {
    if (typeof image !== 'string' || image.length === 0) {
        return "https://placehold.co/600x400?text=Sin+Imagen"
    }

    if (image.startsWith('/uploads/')) {
        return `${API_BASE_URL}${image}`
    }

    return image.replace("via.placeholder.com", "placehold.co")
}
import axios from 'axios'

export const API_URL =
    import.meta.env.VITE_API_URL || "https://loja-1-1rwk.onrender.com";

  
export const api = axios.create({
  baseURL: API_URL,
})


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export function productImageUrl(image) {
  if (!image) return null
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image
  }
  const path = image.startsWith('/') ? image : `/${image}`
  const encoded = path
    .split('/')
    .map((part, i) => (i === 0 || !part ? part : encodeURIComponent(part)))
    .join('/')
  return `${API_URL}${encoded}`
}

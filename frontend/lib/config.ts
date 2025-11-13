// URL base de la API REST de FastAPI
export const API_BASE_URL = 'http://localhost:8000/api/v1';

// Configuración de encabezados comunes
export const getAuthHeaders = (token: string) => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
});

// Endpoints de la API
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/usuarios/me',
  },
  MOVIES: {
    LIST: '/peliculas',
    DETAIL: (id: string) => `/peliculas/${id}`,
  },
  FUNCTIONS: {
    LIST: '/funciones',
    DETAIL: (id: string) => `/funciones/${id}`,
  },
  RESERVATIONS: {
    LIST: '/reservas',
    DETAIL: (id: string) => `/reservas/${id}`,
    CREATE: '/reservas',
  },
  SEATS: {
    BY_FUNCTION: (funcionId: string) => `/funciones/${funcionId}/asientos`,
  },
};

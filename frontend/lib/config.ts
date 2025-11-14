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
    CREATE: '/peliculas',
    UPDATE: (id: string) => `/peliculas/${id}`,
    DELETE: (id: string) => `/peliculas/${id}`,
  },
  FUNCTIONS: {
    LIST: '/funciones',
    DETAIL: (id: string) => `/funciones/${id}`,
    CREATE: '/funciones',
    UPDATE: (id: string) => `/funciones/${id}`,
    DELETE: (id: string) => `/funciones/${id}`,
  },
  RESERVATIONS: {
    LIST: '/reservas',
    DETAIL: (id: string) => `/reservas/${id}`,
    CREATE: '/reservas',
    UPDATE: (id: string) => `/reservas/${id}`,
    DELETE: (id: string) => `/reservas/${id}`,
  },
  INCI: {
    LIST: '/incidencias',
    DETAIL: (id: string) => `/incidencias/${id}`,
    CREATE: '/incidencias',
    UPDATE: (id: string) => `/facturas/${id}`,
    DELETE: (id: string) => `/facturas/${id}`,
  },
  FACTURAS: {
    LIST: '/facturas',
    DETAIL: (id: string) => `/facturas/${id}`,
    CREATE: '/facturas',
    UPDATE: (id: string) => `/facturas/${id}`,
    DELETE: (id: string) => `/facturas/${id}`,
  },
  RESERVA_ASIENTOS: {
    LIST: '/reserva-asientos',
    DETAIL: (id: string) => `/reserva-asientos/${id}`,
    CREATE: '/reserva-asientos',
    UPDATE: (id: string) => `/reserva-asientos/${id}`,
    DELETE: (id: string) => `/reserva-asientos/${id}`,
  },
  ReservaAsiento: {
    LIST: (id: string) => `/reservas/${id}/asientos`,
    CREATE: (id: string) => `/reservas/${id}/asientos`,
    UPDATE: (id: string, asientoId: string) => `/reservas/${id}/asientos/${asientoId}`,
    DELETE: (id: string, asientoId: string) => `/reservas/${id}/asientos/${asientoId}`,
  },
};

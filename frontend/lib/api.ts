import { API_BASE_URL, API_ENDPOINTS, getAuthHeaders } from "./config";
import { fetchGraphQL, QUERIES } from "./graphql";

type Method = "GET" | "POST" | "PUT" | "DELETE";

async function apiRequest<T>(
  endpoint: string,
  method: Method = "GET",
  data?: any,
  token?: string
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
    credentials: "include", // Para manejar cookies si es necesario
  };

  if (data && method !== "GET") {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      let errorMessage = "Error en la solicitud";
      try {
        const errorData = await response.json();
        console.error("API Error Response:", errorData);
        errorMessage =
          errorData.detail || errorData.message || JSON.stringify(errorData);
      } catch (e) {
        console.error("Failed to parse error response:", e);
      }
      throw new Error(errorMessage);
    }

    // Si la respuesta es 204 No Content, no intentamos hacer .json()
    if (response.status === 204) {
      return {} as T;
    }

    return await response.json();
  } catch (error) {
    console.error("API Request Error:", {
      url,
      method,
      error: error instanceof Error ? error.message : "Unknown error",
      errorObject: error,
    });
    throw error;
  }
}

// Servicios específicos
export const authService = {
  login: (email: string, password: string) =>
    apiRequest<{ access_token: string; token_type: string }>(
      "/auth/login-json", // Using the JSON endpoint
      "POST",
      { correo: email, password }
    ).then((data) => ({
      token: data.access_token,
      user: { email }, // The backend will need to return the user data or we'll need to fetch it separately
    })),

  register: async (userData: any) => {
    try {
      console.log("Sending registration request:", userData);

      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.AUTH.REGISTER}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(userData),
          credentials: "include",
        }
      );

      const responseData = await response.json().catch(() => ({}));

      if (!response.ok) {
        console.error("Registration failed:", {
          status: response.status,
          statusText: response.statusText,
          responseData,
        });

        const errorMessage =
          responseData.detail ||
          responseData.message ||
          `Error al registrar el usuario (${response.status})`;
        throw new Error(errorMessage);
      }

      console.log("Registration successful:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error in register API call:", error);
      throw error;
    }
  },

  getProfile: (token: string) =>
    apiRequest<any>(API_ENDPOINTS.AUTH.PROFILE, "GET", undefined, token),
};

export const movieService = {
  getAll: async (token: string) => {
    const data = await fetchGraphQL<{ peliculas: any[] }>({
      query: QUERIES.MOVIES,
      token,
    });
    return data.peliculas;
  },

  getById: async (id: string, token: string) => {
    const data = await fetchGraphQL<{ pelicula: any }>({
      query: QUERIES.MOVIE_BY_ID,
      variables: { id },
      token,
    });
    return data.pelicula;
  },
};

export const functionService = {
  getAll: (token: string) =>
    apiRequest<any[]>(API_ENDPOINTS.FUNCTIONS.LIST, "GET", undefined, token),

  getById: (id: string, token: string) =>
    apiRequest<any>(
      API_ENDPOINTS.FUNCTIONS.DETAIL(id),
      "GET",
      undefined,
      token
    ),

  getByMovieId: async (movieId: string, token: string) => {
    // No hay query por movieId directo en el schema, traemos todas y filtramos
    const data = await fetchGraphQL<{ funciones: any[] }>({
      query: QUERIES.FUNCTIONS,
      token,
    });
    const funciones = (data.funciones || []).filter(
      (f) =>
        Array.isArray(f.peliculas) &&
        f.peliculas.filter((p: any) => p.id_pelicula === movieId)
    );
    // Adaptar al contrato del frontend: { id_funcion, fecha_hora, precio, id_pelicula, id_sala }
    const mapped = funciones.map((f: any) => ({
      id_funcion: f.id_funcion,
      fecha_hora: f.fecha_hora,
      precio: f.precio,
      id_pelicula: f.peliculas?.[0]?.id_pelicula ?? movieId,
      id_sala: f.salas?.[0]?.id_sala ?? undefined,
    }));
    
    console.log('✅ Funciones mapeadas finales:', mapped);
    
    return mapped;
  },

  getByIdGraphQL: async (id: string, token: string) => {
    const data = await fetchGraphQL<{ funcion: any }>({
      query: QUERIES.FUNCTION_BY_ID,
      variables: { id },
      token,
    });
    return data.funcion;
  },
};

export const seatService = {
  create: (data: { numero: number; estado: string; id_sala: string }, token: string) =>
    apiRequest<any>(API_ENDPOINTS.SEATS.CREATE, "POST", data, token),

  getAll: (token: string) =>
    apiRequest<any[]>(API_ENDPOINTS.SEATS.LIST, "GET", undefined, token),

  getById: (id: string, token: string) =>
    apiRequest<any>(
      API_ENDPOINTS.SEATS.DETAIL(id),
      "GET",
      undefined,
      token
    ),
};

export const reservationService = {
  create: (data: {
    cantidad_asientos: number;
    estado: string;
    id_funcion: string;
    id_usuario: string;
    total: number;
    fecha_reserva: string;
  }, token: string) =>
    apiRequest<any>(API_ENDPOINTS.RESERVATIONS.CREATE, "POST", data, token),

  getAll: (token: string) =>
    apiRequest<any[]>(API_ENDPOINTS.RESERVATIONS.LIST, "GET", undefined, token),

  getById: (id: string, token: string) =>
    apiRequest<any>(
      API_ENDPOINTS.RESERVATIONS.DETAIL(id),
      "GET",
      undefined,
      token
    ),

  addSeat: (reservationId: string, seatId: string, token: string) =>
    apiRequest<any>(
      API_ENDPOINTS.ReservaAsiento.CREATE(reservationId, seatId),
      "POST",
      undefined,
      token
    ),
};

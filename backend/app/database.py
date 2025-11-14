from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings

# Crear engine de SQLAlchemy
# Configuración optimizada para Supabase (modo sesión tiene límite de ~15 conexiones)
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,      # Verifica conexiones antes de usarlas
    pool_size=5,             # Número de conexiones en el pool (reducido para Supabase)
    max_overflow=5,          # Conexiones adicionales permitidas (reducido para Supabase)
    pool_recycle=3600,       # Recicla conexiones después de 1 hora
    pool_reset_on_return='commit',  # Resetea la conexión al devolverla al pool
    echo=False               # Desactivar logs SQL en producción
)

# Session local
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para modelos
Base = declarative_base()

# Dependency para obtener DB session
def get_db():
    """
    Dependencia que proporciona una sesión de base de datos.
    Se cierra automáticamente después de cada request.
    Asegura que la conexión se devuelva al pool correctamente.
    """
    db = SessionLocal()
    try:
        yield db
    except Exception:
        # En caso de error, hacer rollback antes de cerrar
        db.rollback()
        raise
    finally:
        # Cerrar la sesión y devolver la conexión al pool
        db.close()
from pydantic import BaseModel, UUID4, Field
from typing import Optional

class ReservaAsientoBase(BaseModel):
    id_reserva: UUID4
    id_asiento: UUID4

class ReservaAsientoCreate(ReservaAsientoBase):
    pass

class ReservaAsientoResponse(ReservaAsientoBase):
    id: UUID4
    
    class Config:
        from_attributes = True

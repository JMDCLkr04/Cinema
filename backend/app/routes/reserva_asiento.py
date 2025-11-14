from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import Reserva, Asiento, ReservaAsiento
from app.schemas.reserva_asiento import ReservaAsientoCreate, ReservaAsientoResponse
from app.utils.dependencies import get_or_404

router = APIRouter()

@router.get("/reservas/{id_reserva}/asientos", response_model=List[dict])
async def get_asientos_por_reserva(id_reserva: str, db: Session = Depends(get_db)):
    """
    Obtener todos los asientos de una reserva
    
    Devuelve una lista de asientos asociados a una reserva específica con la siguiente estructura:
    {
        "id": "uuid",
        "id_reserva": "uuid",
        "id_asiento": "uuid"
    }
    """
    # Verificar que la reserva existe
    reserva = db.query(Reserva).filter(Reserva.id_reserva == id_reserva).first()
    if not reserva:
        raise HTTPException(status_code=404, detail="Reserva no encontrada")
    
    # Obtener las relaciones reserva-asiento
    reserva_asientos = db.query(ReservaAsiento).filter(
        ReservaAsiento.id_reserva == id_reserva
    ).all()
    
    return [{
        "id_reserva": str(ra.id_reserva),
        "id_asiento": str(ra.id_asiento)
    } for ra in reserva_asientos]

@router.post(
    "/reservas/{id_reserva}/asientos/{id_asiento}", 
    status_code=status.HTTP_201_CREATED,
    response_model=ReservaAsientoResponse
)
async def agregar_asiento_a_reserva(
    id_reserva: str, 
    id_asiento: str, 
    db: Session = Depends(get_db)
):
    """Agregar un asiento a una reserva"""
    # Verificar que la reserva existe
    reserva = db.query(Reserva).filter(Reserva.id_reserva == id_reserva).first()
    if not reserva:
        raise HTTPException(status_code=404, detail="Reserva no encontrada")
    
    # Verificar que el asiento existe
    asiento = db.query(Asiento).filter(Asiento.id_asiento == id_asiento).first()
    if not asiento:
        raise HTTPException(status_code=404, detail="Asiento no encontrado")
    
    # Verificar si el asiento ya está en esta reserva
    reserva_existente = db.query(ReservaAsiento).filter(
        ReservaAsiento.id_asiento == id_asiento,
        ReservaAsiento.id_reserva == id_reserva
    ).first()
    
    if reserva_existente:
        raise HTTPException(status_code=400, detail="El asiento ya está en esta reserva")
    
    # Verificar si el asiento ya está reservado en otra reserva
    reserva_otra = db.query(ReservaAsiento).filter(
        ReservaAsiento.id_asiento == id_asiento,
        ReservaAsiento.id_reserva != id_reserva
    ).first()
    
    if reserva_otra:
        raise HTTPException(status_code=400, detail="El asiento ya está reservado en otra reserva")
    
    # Crear la relación reserva-asiento
    reserva_asiento = ReservaAsiento(
        id_reserva=id_reserva,
        id_asiento=id_asiento
    )
    
    db.add(reserva_asiento)
    db.commit()
    db.refresh(reserva_asiento)
    
    # Obtener el asiento para incluirlo en la respuesta
    asiento = db.query(Asiento).filter(Asiento.id_asiento == id_asiento).first()
    
    return {
        "id": reserva_asiento.id,
        "id_reserva": str(reserva_asiento.id_reserva),
        "id_asiento": str(reserva_asiento.id_asiento),
        "numero_asiento": asiento.numero if asiento else None,
        "estado_asiento": asiento.estado if asiento else None
    }

@router.delete(
    "/reservas/{id_reserva}/asientos/{id_asiento}", 
    status_code=status.HTTP_204_NO_CONTENT
)
async def remover_asiento_de_reserva(
    id_reserva: str, 
    id_asiento: str, 
    db: Session = Depends(get_db)
):
    """Eliminar un asiento de una reserva"""
    # Buscar la relación reserva-asiento
    reserva_asiento = db.query(ReservaAsiento).filter(
        ReservaAsiento.id_reserva == id_reserva,
        ReservaAsiento.id_asiento == id_asiento
    ).first()
    
    if not reserva_asiento:
        raise HTTPException(
            status_code=404, 
            detail="No se encontró el asiento en la reserva especificada"
        )
    
    # Eliminar la relación
    db.delete(reserva_asiento)
    db.commit()
    
    return None

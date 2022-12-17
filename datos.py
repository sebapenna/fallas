from enum import Enum


class NombreCaracteristicas(Enum):
    PRECIO = "precio"
    RIGIDEZ = "rigidez"
    DURACION = "duracion"
    RESISTENCIA = "resistencia"
    MOVIMIENTO = "movimiento"


class Precio(Enum):
    "Precio buscado."

    CA = "caro"
    EC = "economico"
    BA = "barato"


class Rigidez(Enum):
    "Rigidez buscada."

    RIB = "baja"
    RIM = "media"
    RIA = "alta"


class Duracion(Enum):
    "Duracion buscada."

    DA = "Mas de 10 años"
    DM = "Entre 5 y 10 años"
    DB = "Menos de 5 años"


class Resistencia(Enum):
    "Resistencia buscada."

    REB = "baja"
    REM = "media"
    REA = "alta"


class Movimiento(Enum):
    "Cantidad de movimiento transferido buscado."

    NT = "No transfiere"
    TP = "Transfiere poco"
    TM = "Transfiere mucho"


class TipoDeColchon(Enum):
    "Tipo de colchon recomendado."

    EM = "Espuma media densidad"
    EA = "Espuma alta densidad"
    RB = "Resortes biconicos"
    RI = "Resortes individuales"
